/** Limits of POST /api/bookings/:id/photos/preview (docs/api/05-staff.md). */
export const ACCEPTED_TYPES = Object.freeze(['image/jpeg', 'image/png'])
export const MAX_BYTES = 10 * 1024 * 1024

export function validatePreview({ title, file }) {
  const errors = {}
  if (!title.trim()) errors.title = 'Nhập tiêu đề ảnh.'
  if (!file) errors.file = 'Chọn một ảnh để tải lên.'
  else if (!ACCEPTED_TYPES.includes(file.type)) errors.file = 'Chỉ nhận ảnh JPEG hoặc PNG.'
  else if (file.size > MAX_BYTES) errors.file = 'Ảnh vượt quá giới hạn 10 MB.'
  return errors
}
