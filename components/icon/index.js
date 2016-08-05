import * as React from 'react';

let typeMap = {
    'color-jpg': 'color-image',
    'color-jpeg': 'color-image',
    'color-png': 'color-image',
    'color-gif': 'color-image',
    'color-docx': 'color-doc',
    'color-xlsx': 'color-xls',
    'color-pptx': 'color-ppt'
}
export default props => {
    let {type, className = ''} = props;
    if (type.indexOf('color-') === 0) {
        let realType = typeMap[type];
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
