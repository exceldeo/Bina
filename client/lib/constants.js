export const defaultToastMessage = {
  loading: 'Loading...',
  success: 'Berhasil',
  error: (err) =>
    err?.response?.data?.msg ?? 'Terjadi kesalahan, mohon coba lagi',
};
