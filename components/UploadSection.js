export default function UploadSection() {
  return (
    <section className="mt-5 py-10 flex items-center justify-center
      bg-linear-to-br from-purple-600 via-indigo-500 to-cyan-400 rounded-lg">

      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl
        p-10 md:w-[60%] w-[80%] text-center">

        <h1 className="text-3xl font-bold text-gray-900">
          Convert Images to PDF
        </h1>

        <p className="mt-3 text-gray-600">
          Upload JPG, PNG or WEBP images and convert them instantly
        </p>

        {/* Upload box */}
        <label className="mt-8 flex flex-col items-center justify-center
          border-2 border-dashed border-gray-300 rounded-xl
          p-10 cursor-pointer hover:border-purple-500
          transition-all duration-300 hover:bg-gray-50">

          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            multiple
            className="hidden"
          />

          <div className="text-5xl">📄</div>

          <p className="mt-4 font-medium text-gray-700">
            Click to upload or drag & drop
          </p>

          <p className="text-sm text-gray-500 mt-1">
            JPG, PNG, WEBP supported
          </p>
        </label>
      </div>
    </section>
  );
}