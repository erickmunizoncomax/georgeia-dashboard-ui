import React from 'react';
import './webix.css';
// const webix = window.webix;
const webix = window.webix || require("@xbs/webix-pro");
window.webix = webix;

export default class Webix extends React.Component {

    componentWillUnmount() {
        this.ui.destructor();
        this.ui = null;
    }

    componentDidMount() {
        this.renderContainer()
    }

    handleApply(selectedValues) {
        // const { dispatch } = this.props;
        // dispatch(Events.ON_APPLY(selectedValues));
        const { onApply } = this.props;
        onApply(selectedValues);
    }

    renderContainer() {
        let { config, data, defaultSelected } = this.props
        var that = this;
        let selectedValues = defaultSelected || [];
        var list1 = {
            view: "list", id: "list1",
            height: 300,
            type: {
                height: 50, width: 200
            },
            select: true, drag: true, multiselect: true,
            data: data.filter(item => !selectedValues.includes(item.value))
        };
        var list2 = {
            view: "list", id: 'list2',
            height: 300,
            type: {
                height: 50, width: 200
            },
            select: true, drag: "true", multiselect: true,
            data: data.filter(item => selectedValues.includes(item.value))
        };
        webix.ready(() => {
            this.ui = webix.ui({
                type: "space",
                rows: [
                    {
                        cols: [
                            list1,
                            {
                                css: {
                                    'text-align': '-webkit-center',
                                    'padding-top': '60px'
                                }, width: 100,
                                rows: [
                                    {
                                        cols: [
                                            {
                                                view: "button", id: "double_left", click: this.onButtonClick.bind(this), value: "Button",
                                                type: "icon", icon: "wxi-angle-double-left", inputWidth: 50
                                            }, {
                                                view: "button", id: "double_right", click: this.onButtonClick.bind(this), value: "Button",
                                                type: "icon", icon: "wxi-angle-double-right", inputWidth: 50
                                            }
                                        ]
                                    }, {
                                        cols: [
                                            {
                                                view: "button", id: "left", click: this.onButtonClick.bind(this), value: "Button",
                                                type: "icon", icon: "wxi-angle-left", inputWidth: 50
                                            }, {
                                                view: "button", id: "right", click: this.onButtonClick.bind(this), value: "Button",
                                                type: "icon", icon: "wxi-angle-right", inputWidth: 50
                                            }
                                        ]
                                    }
                                ]
                            },
                            list2
                        ]
                    },
                    {
                        cols: [
                            {}, {},
                            {
                                view: "button", value: "Apply and Save", click: function () {
                                    selectedValues = window.$$('list2').data.serialize().map(itr => itr.value)
                                    that.handleApply(selectedValues)
                                }
                            }
                        ]
                    }
                ], container: that.mainNode
            });
        })

    }

    onButtonClick(id) {

        if (id == 'double_right') {
            window.$$('list1').selectAll()
            this.addData("list1")
            this.removeData("list1")
        }
        else if (id == 'double_left') {
            window.$$('list2').selectAll()
            this.addData("list2")
            this.removeData("list2")
        }
        else if (id == 'left') {
            this.addData("list2")
            this.removeData("list2")
        }
        else if (id == 'right') {
            this.addData("list1")
            this.removeData("list1")
        }
    }
    addData(list) {
        var target = (list == 'list1') ? 'list2' : 'list1'
        if (Array.isArray(window.$$(list).getSelectedId())) {
            window.$$(list).getSelectedId().map(item => {
                window.$$(target).add(window.$$(list).getItem(item));
            })
        }
        else if (window.$$(list).getSelectedId()) {
            window.$$(target).add(window.$$(list).getItem(window.$$(list).getSelectedId()));
        }
    }

    removeData(list) {
        if (!window.$$(list).getSelectedId()) {
            webix.message("No item is selected!");
            return;
        }
        window.$$(list).remove(window.$$(list).getSelectedId());
    }


    render() {
        return (
            <div ref={(element) => this.mainNode = element}></div>
        );
    }

}

