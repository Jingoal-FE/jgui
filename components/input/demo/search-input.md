---
order: 4
title: 搜索框
---

带有搜索按钮的输入框。

````jsx
import { Input, Button } from 'jgui';
import classNames from 'classnames';
const InputGroup = Input.Group;

const SearchInput = React.createClass({
  getInitialState() {
    return {
      value: '',
      focus: false,
    };
  },
  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  },
  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  },
  handleSearch() {
    if (this.props.onSearch) {
      this.props.onSearch(this.state.value);
    }
  },
  render() {
    const { style, size, ...restProps } = this.props;
    const btnCls = classNames({
      'jgui-search-btn': true,
      'jgui-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'jgui-search-input': true,
      'jgui-search-input-focus': this.state.focus,
    });
    return (
      <div className="jgui-search-input-wrapper" style={style}>
        <InputGroup className={searchCls}>
          <Input {...restProps} value={this.state.value} onChange={this.handleInputChange}
            onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur} onPressEnter={this.handleSearch}
          />
          <div className="jgui-input-group-wrap">
            <Button icon="search" className={btnCls} size={size} onClick={this.handleSearch} />
          </div>
        </InputGroup>
      </div>
    );
  },
});

ReactDOM.render(
  <SearchInput placeholder="input search text"
    onSearch={value => console.log(value)} style={{ width: 200 }}
  />
, mountNode);
````
