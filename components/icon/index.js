import * as React from 'react';

export default props => {
    const {type, className = ''} = props;
    if (type.indexOf('color-') === 0) {
        // let name = type.substr(6);
        let className = `jgicon jgicon-${type}`;
        // let tpl = require(`./tpl/${name}.tpl`);
        // console.log(tpl);
        // return (<span className={className} dangerouslySetInnerHTML={{__html: tpl}}></span>)
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
