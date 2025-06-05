export async function uploadImage(file: File) {
  const formData = new FormData()
  formData.append("image", file)
  const res = await fetch("http://localhost:8000/api/v1/validateImage", {
    method: "POST",
    body: formData,
  })
  if (!res.ok) throw new Error("Upload failed")
  return res.json()          // { annotated_image_b64, quantity_per_class }
}