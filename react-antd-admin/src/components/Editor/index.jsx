import React, { useRef, useEffect } from 'react'
import E from 'wangeditor'
export default function Index(props) {
    const ref = useRef()
    useEffect(() => {
        const editor = new E(ref.current)
        editor.config.excludeMenus = ['emoticon', 'video']
        editor.config.showLinkImg = false
        editor.config.onchange = (newHtml) => {
            props.onChange && props.onChange(newHtml)
        }
        editor.config.customUploadImg = (resultFiles, insertImgFn) => {
            const form = new FormData()
            form.append('file', resultFiles[0])
            global.services.post("/loca/loca/upload/upload", form).then((res) => {
                insertImgFn('/picture'+res.file.url)
            })
        }
        editor.create()
        props.defaultValue && editor.txt.html(props.defaultValue)
        return () => {
            if (editor) {
                editor.destroy();
            }
        };
    }, [])
    return (
        <div ref={ref}>

        </div>
    )
}
