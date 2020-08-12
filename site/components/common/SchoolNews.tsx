import React from "react"

const commonListStyle = require("@styles/components/common/CommonList.module.css")

import CommonBox from "./tools/CommonBox"

interface News {
    title: string
    time: string
    href: string
}

interface SchoolNewsProps {
    news: Array<News>
}

export default class SchoolNews extends React.Component<SchoolNewsProps> {
    static defaultProps: SchoolNewsProps = {
        news: [],
    }
    render() {
        const { news } = this.props
        return (
            <CommonBox header="校园新闻">
                <ol className={commonListStyle.ol}>
                    {news.map((item) => (
                        <li key={item.href}>
                            <div className={commonListStyle.ellipsis}>
                                <a href={item.href} title={item.title}>
                                    {item.title}
                                </a>
                            </div>
                            <span className={commonListStyle.time}>
                                {item.time}
                            </span>
                        </li>
                    ))}
                </ol>
            </CommonBox>
        )
    }
}
