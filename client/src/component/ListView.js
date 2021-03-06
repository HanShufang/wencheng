/**
 * Created by wujichao on 16/4/28.
 */

"use strict";

import React from 'react';

import {
    Cells,
    CellsTitle,
    CellsTips,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
} from 'react-weui';

/*
 headerView
 section cell(可配置cell)?  先title subtitle + jumpUrl
 footerView
 */

export default class ListView extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    componentWillMount () {

    }

    componentDidMount () {

    }

    componentWillUnmount () {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            loaded: true
        });
    }

    render() {

        var section_titles = this.props.sections.map((section) => {
            return (<CellsTitle style={{height:'1.5em'}}>{section.header.title}</CellsTitle>);
        });

        var section_rows = this.props.sections.map((section) => {
            var rows = [];
            for (var i = 0; i < section.rows.length; i++) {
                var item = section.rows[i];
                if (!item.key) {
                    throw new Error('必须提供唯一的key');
                }
                rows.push(<Cell href={item.jumpUrl} key={item.key}>
                    <CellBody style={{minWidth:'27%'}}>
                       {item.title}
                    </CellBody>
                    <CellFooter>
                        {item.subTitle}
                    </CellFooter>
                </Cell>);
            }
            return (<Cells access={!!section.header.access}>{rows}</Cells>);
        });

        var table = [];
        for (var i = 0; i < section_titles.length; i++) {
            table.push(section_titles[i]);
            table.push(section_rows[i]);
        }

        var components = [];
        if (this.props.headerView) {
            components.push(this.props.headerView)
        }
        if (table.length > 0) {
            components.push(table);
        }
        if (this.props.footerView) {
            components.push(this.props.footerView)
        }

        if (components.length === 0) {
            if (this.state.loaded) {
                return (
                    <div style={{textAlign:'center', marginTop:'38%'}}>
                        没有数据
                    </div>
                );
            } else {
                return (
                    <div>{null}</div>
                );
            }
        } else {
            return (
                <div>
                    {components}
                </div>
            );
        }
    }
}

/*
 sections =  [
    {
        header:{title:'', access:true ...},
        rows:[{title, subTitle, jumpUrl}, {}]
    }
 ]
 其中access只能按section配置, 不能指定单独cell
 */
ListView.defaultProps = {
    sections: []
};

ListView.propTypes = {
    sections: React.PropTypes.array,
    headerView: React.PropTypes.element,
    footerView: React.PropTypes.element,
};
