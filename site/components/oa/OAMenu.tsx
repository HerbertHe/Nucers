import React from "react"
import { Menu, Button } from "antd"
import {
    UserOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ClusterOutlined,
    SubnodeOutlined,
    UserSwitchOutlined,
    UserAddOutlined,
    DesktopOutlined,
    MessageOutlined,
    FlagOutlined,
    MoneyCollectOutlined,
    PoweroffOutlined,
} from "@ant-design/icons"
import { inject, observer } from "mobx-react"
import { OnlyDarkThemeStoreType } from "@stores/DarkThemeStore"
import { backOAURL } from "@utils/utils"
const { SubMenu } = Menu

interface IOAMenuProps extends OnlyDarkThemeStoreType {}

interface IOAMenuStates {
    collapsed: boolean
}

@inject("darkThemeStore")
@observer
export default class OAMenu extends React.Component<
    IOAMenuProps,
    IOAMenuStates
> {
    constructor(props: IOAMenuProps) {
        super(props)
        this.state = {
            collapsed: true,
        }
    }
    static async getInitialProps({ mobxStore }) {
        return {
            darkThemeStore: mobxStore.darkThemeStore,
        }
    }
    toggleCollapsed() {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }
    render() {
        const { darkNow, setDark } = this.props.darkThemeStore
        return (
            <div
                style={{
                    width: 256,
                    position: "fixed",
                    top: 0,
                    left: 0,
                }}
            >
                <div
                    style={{
                        backgroundColor: darkNow ? "#001529" : "white",
                        color: darkNow ? "white" : "black",
                        width: "100vw",
                        height: "70px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div>
                        <Button
                            type="primary"
                            onClick={() => {
                                localStorage.setItem(
                                    "darkNow",
                                    String(!darkNow ? String(1) : String(0))
                                )
                                setDark()
                            }}
                        >
                            <PoweroffOutlined />
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => this.toggleCollapsed()}
                        >
                            {React.createElement(
                                this.state.collapsed
                                    ? MenuUnfoldOutlined
                                    : MenuFoldOutlined
                            )}
                        </Button>
                    </div>

                    <div
                        style={{
                            fontSize: "large",
                            fontWeight: 500,
                            margin: "0 40px",
                        }}
                    >
                        Nucers Group后台管理系统
                    </div>
                </div>

                <Menu
                    inlineCollapsed={this.state.collapsed}
                    mode="inline"
                    theme={darkNow ? "dark" : "light"}
                >
                    <SubMenu
                        key="webManagement"
                        title="门户管理"
                        icon={<ClusterOutlined />}
                    >
                        <Menu.Item icon={<DesktopOutlined />}>
                            <a
                                href={`${
                                    location.origin +
                                    backOAURL(location.pathname)
                                }/info`}
                            >
                                基本信息
                            </a>
                        </Menu.Item>
                        <Menu.Item icon={<MessageOutlined />}>
                            <a
                                href={`${
                                    location.origin +
                                    backOAURL(location.pathname)
                                }/notices`}
                            >
                                公告管理
                            </a>
                        </Menu.Item>
                        <Menu.Item icon={<FlagOutlined />}>
                            <a
                                href={`${
                                    location.origin +
                                    backOAURL(location.pathname)
                                }/acts`}
                            >
                                活动管理
                            </a>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="peopleSub"
                        title="成员管理"
                        icon={<UserOutlined />}
                    >
                        <Menu.Item
                            key="people-management"
                            icon={<UserSwitchOutlined />}
                        >
                            <a
                                href={`${
                                    location.origin +
                                    backOAURL(location.pathname)
                                }/members`}
                            >
                                成员管理
                            </a>
                        </Menu.Item>
                        <Menu.Item key="people-add" icon={<UserAddOutlined />}>
                            <a
                                href={`${
                                    location.origin +
                                    backOAURL(location.pathname)
                                }/members-add`}
                            >
                                新增成员
                            </a>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item icon={<MoneyCollectOutlined />}>
                        <a
                            href={`${
                                location.origin + backOAURL(location.pathname)
                            }/finance`}
                        >
                            财务管理
                        </a>
                    </Menu.Item>
                    <Menu.Item icon={<SubnodeOutlined />}>
                        <a
                            href={`${
                                location.origin + backOAURL(location.pathname)
                            }/plugins`}
                        >
                            插件管理
                        </a>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}