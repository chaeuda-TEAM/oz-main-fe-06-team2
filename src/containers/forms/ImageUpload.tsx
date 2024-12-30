const ImageUploadForm = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">이미지, 영상</h2>
      <p className="text-sm text-gray-500 mb-4">
        - 최소 1장 이상의 사진을 등록해야 하며, 최대 15장까지 등록이 가능합니다. (한 장당 10MB 이하)
        <br />
        - 첫번째 사진이 대표 이미지로 보여지며, 순서를 변경할 수 있습니다.
        <br />
        - 영상은 1개 이하로 등록하실 수 있습니다.
        <br />- 매물과 관련없는 이미지, 홍보성 이미지, 워터마크 이미지는 등록하실 수 없습니다.
      </p>
      <div className="border-2 border-dashed border-gray-300 p-4 text-center">
        <label className="cursor-pointer">
          <span className="block text-gray-500">Upload Additional File</span>
          <input type="file" multiple className="hidden" />
        </label>
      </div>
    </div>
  );
};

export default ImageUploadForm;
