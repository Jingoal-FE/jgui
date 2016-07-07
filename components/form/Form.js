import React from 'react';
import classNames from 'classnames';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Form extends React.Component {
  static defaultProps = {
    prefixCls: 'jgui-form',
    onSubmit(e) {
      e.preventDefault();
    },
  }

  static propTypes = {
    prefixCls: React.PropTypes.string,
    horizontal: React.PropTypes.bool,
    inline: React.PropTypes.bool,
    form: React.PropTypes.object,
    children: React.PropTypes.any,
    onSubmit: React.PropTypes.func,
  }

  static childContextTypes = {
    form: React.PropTypes.object,
  }

  shouldComponentUpdate(...args) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }

  getChildContext() {
    return {
      form: this.props.form,
    };
  }

  render() {
    const { prefixCls, className, style } = this.props;
    const formClassName = classNames({
      [`${prefixCls}-horizontal`]: this.props.horizontal,
      [`${prefixCls}-inline`]: this.props.inline,
      [className]: !!className,
    });

    return (
      <form {...this.props} className={formClassName} style={style}>
        {this.props.children}
      </form>
    );
  }
}
