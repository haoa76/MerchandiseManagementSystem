import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { set } from 'lodash';
import React, { useState } from 'react';
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const App = (props) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [previewFile, setPreviewFile] = useState(null); // 存储当前预览的文件信息

    const [fileList, setFileList] = useState(props.defaultFileList || []);
    const { maxCount = 1 } = props;
    const handleCancel = () => {
        setPreviewOpen(false)
    };
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        setPreviewFile(file)
    };
    const handleChange = ({ fileList: newFileList }) => {
        console.log(newFileList)
        let newFileList1 = newFileList.map((file) => {
            if (file.status === 'done' && file.response && typeof file.response === 'object' && file.response.file) {
                file.url = file.response.file.url;
            }
            return file;
        });
        setFileList(newFileList1)
        props.onChange(newFileList1)
    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                上传
            </div>
        </div>
    );
    // 解析 props.editImage 字符串为数组
    const editImageArray = props.editImage ? props.editImage.split(',').map((path) => `/picture/${path.trim()}`) : [];

    return (
        <>
            <Upload
                name="file"
                headers={{ Authorization: sessionStorage.token }}
                action="/loca/loca/upload/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                defaultFileList={props.defaultFileList}
                onChange={handleChange}
            >
                {fileList.length >= maxCount ? null : uploadButton}
            </Upload >
            {/* <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="error"
                    style={{
                        width: '100%',
                    }}
                    // src={props.editImage ? `/picture/${props.editImage}` : `/picture/${previewImage}`}
                    src={props.editImage ? `/picture/${props.editImage}` : `/picture/${previewFile?.url}`}
                />
            </Modal> */}
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                {previewFile && (
                    <img
                        alt="error"
                        style={{
                            width: '100%',
                        }}
                        src={props.imgWay ? previewFile.url : ('/picture' + previewImage)}
                        
                        // src={previewImage ? ('/picture' + previewImage): previewFile.url}
                        // src={'/picture' + previewImage}
                        onError={(e) => {
                            console.error('Image load failed:', e.target.src); // 调试信息
                        }}
                    />
                )}
            </Modal>
            {/* 显示多个图片 */}
            {/* {editImageArray.length > 0 && (
                <Modal open={previewOpen} title="预览图片" footer={null} onCancel={handleCancel}>
                    <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'scroll', whiteSpace: 'nowrap' }}>
                        {editImageArray.map((src, index) => (
                            <img
                                key={index}
                                alt={`preview-${index}`}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    marginRight: '10px',
                                }}
                                src={src}
                                onError={(e) => {
                                    console.error('Image load failed:', e.target.src); // 调试信息
                                }}
                            />
                        ))}
                    </div>
                </Modal>
            )} */}
        </>
    );
};
export default App;