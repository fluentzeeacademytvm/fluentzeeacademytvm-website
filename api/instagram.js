const INSTAGRAM_API_VERSION = process.env.INSTAGRAM_GRAPH_API_VERSION || "v25.0";
const INSTAGRAM_MEDIA_FIELDS = [
  "id",
  "caption",
  "media_type",
  "media_url",
  "permalink",
  "thumbnail_url",
  "timestamp",
  "children{media_type,media_url,thumbnail_url}"
].join(",");
const PAGE_SIZE = 12;

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!accessToken) {
    return response.status(503).json({
      error: "The Instagram feed has not been configured yet."
    });
  }

  const after = typeof request.query?.after === "string" ? request.query.after : "";
  if (after.length > 2048) {
    return response.status(400).json({ error: "Invalid Instagram page cursor." });
  }

  const mediaUrl = new URL(`https://graph.instagram.com/${INSTAGRAM_API_VERSION}/me/media`);
  mediaUrl.searchParams.set("fields", INSTAGRAM_MEDIA_FIELDS);
  mediaUrl.searchParams.set("limit", String(PAGE_SIZE));
  mediaUrl.searchParams.set("access_token", accessToken);
  if (after) mediaUrl.searchParams.set("after", after);

  try {
    const instagramResponse = await fetch(mediaUrl, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10000)
    });

    if (!instagramResponse.ok) {
      console.error("Instagram API request failed with status", instagramResponse.status);
      return response.status(502).json({
        error: "Instagram posts are temporarily unavailable. Please try again later."
      });
    }

    const result = await instagramResponse.json();
    response.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    return response.status(200).json({
      posts: Array.isArray(result.data) ? result.data : [],
      nextCursor: result.paging?.cursors?.after || null,
      hasMore: Boolean(result.paging?.next && result.paging?.cursors?.after)
    });
  } catch (error) {
    console.error("Instagram API request could not be completed", error.name || "UnknownError");
    return response.status(502).json({
      error: "Instagram posts are temporarily unavailable. Please try again later."
    });
  }
}
