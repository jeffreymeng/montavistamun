export default async function blobToBuffer(blob: Blob): Promise<ArrayBuffer> {
	return await new Response(blob).arrayBuffer();
}
