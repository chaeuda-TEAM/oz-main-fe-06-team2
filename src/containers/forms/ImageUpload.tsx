import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableMedia from './DraggableMedia';

const MAX_IMG_COUNT = 10;

export interface ImageData {
  images: File[];
}

interface FileData {
  id: string;
  file: File;
  url: string;
}

const ImageUploadForm: React.FC<{ onSubmitData: (data: ImageData) => void }> = ({
  onSubmitData,
}) => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      let imgCount = files.length;

      Array.from(selectedFiles).forEach(file => {
        if (imgCount >= MAX_IMG_COUNT) {
          setErrorMessage('사진은 최대 10장까지 등록 가능합니다.');
          return;
        }

        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
          const isDuplicate = files.some(fileData => fileData.file.name === file.name);
          if (isDuplicate) {
            setErrorMessage('이미 같은 파일이 존재합니다.');
            return;
          }

          const id = crypto.randomUUID();
          const reader = new FileReader();

          reader.onloadend = () => {
            const url = reader.result as string;
            const fileData: FileData = { id, file, url };
            setFiles(prev => [...prev, fileData]);
          };

          reader.readAsDataURL(file);
          imgCount++;
        }
      });

      if (imgCount === 0) {
        setErrorMessage('최소 1장 이상의 사진을 등록해야 합니다.');
      } else {
        setErrorMessage('');
      }
    }
  };

  //preview 내 삭제 기능
  const handleDelete = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  //drag and drop 기능
  const moveItem = (fromIndex: number, toIndex: number) => {
    setFiles(prev => {
      const updatedFiles = [...prev];
      const [movedFile] = updatedFiles.splice(fromIndex, 1);
      updatedFiles.splice(toIndex, 0, movedFile);
      return updatedFiles;
    });
  };

  useEffect(() => {
    const imageFiles = files.map(fileData => fileData.file);
    onSubmitData({ images: imageFiles });
  }, [files, onSubmitData]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h2 className="text-lg font-semibold mb-2">이미지, 영상</h2>
        <p className="text-sm text-gray-500 mb-4">
          - 최소 1장 이상의 사진을 등록해야 하며, 최대 10장까지 등록이 가능합니다. (한 장당 10MB
          이하)
          <br />
          - 첫번째 사진이 대표 이미지로 보여지며, 순서를 변경할 수 있습니다.
          <br />
          - 영상은 1개 이하로 등록하실 수 있습니다.
          <br />- 매물과 관련없는 이미지, 홍보성 이미지, 워터마크 이미지는 등록하실 수 없습니다.
        </p>
        {!files.length ? (
          <div className="border-2 border-dashed border-gray-300 hover:border-blue-400 p-4 text-center">
            <label className="cursor-pointer">
              <span className="block text-gray-500">Upload Additional File</span>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
                accept="image/*,video/*"
              />
            </label>
          </div>
        ) : (
          <div className="mt-4 border-2 border-gray-300 space-y-3 p-4">
            <label className="cursor-pointer">
              <span className="block border w-[90px] bg-gray-300 hover:bg-gray-400 text-white text-[0.9rem] text-center rounded-md">
                Add File
              </span>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
                accept="image/*,video/*"
              />
            </label>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {files.map((fileData, index) => (
                <DraggableMedia
                  key={fileData.id}
                  id={fileData.id}
                  preview={fileData.url}
                  index={index}
                  moveItem={moveItem}
                  handleDelete={() => handleDelete(fileData.id)}
                />
              ))}
            </div>
          </div>
        )}
        {errorMessage && <p className="text-kick text-sm">{errorMessage}</p>}
      </div>
    </DndProvider>
  );
};

export default ImageUploadForm;
