import * as React from 'react';

let typeMap = {
    'color-bmp': 'color-image',
    'color-jpg': 'color-image',
    'color-jpeg': 'color-image',
    'color-png': 'color-image',
    'color-gif': 'color-image',
    'color-docx': 'color-doc',
    'color-xlsx': 'color-xls',
    'color-pptx': 'color-ppt',
    'color-mp3': 'color-music',
    'color-wma': 'color-music',
    'color-wav': 'color-music',
    'color-acc': 'color-music',
    'color-mod': 'color-music',
    'color-htm': 'color-html',
    'color-tar': 'color-zip',
}
export default props => {
    let {type, className = ''} = props;
    if (type.indexOf('color-') === 0) {
        let realType = typeMap[type.toLowerCase()];
        type = realType || type;
        let className = `jgicon jgicon-color jgicon-${type}`;
        return (
            <span className={className}>
                <span className="path1"></span>
                <span className="path2"></span>
                <span className="path3"></span>
                <span className="path4"></span>
                <span className="path5"></span>
                <span className="path6"></span>
                <span className="path7"></span>
                <span className="path8"></span>
            </span>
        )
    } else {
        return <i {...props} className={`${className} jgicon jgicon-${type}`.trim()}/>
    }
};
