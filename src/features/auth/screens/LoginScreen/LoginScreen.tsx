import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Col, Input, message, Row } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Button from "@app/components/atoms/Button/Button";
import Form, { Item, useForm } from "@app/components/atoms/Form/Form";
import { LoginRequestDef } from "@app/features/auth/auth";
import { useAppDispatch, useAppSelector } from "@app/redux/store";

import { ReactComponent as Logo } from "../../../../assets/images/logo.svg";
import useRedirectAfterLogin from "../../hooks/useRedirectAfterLogin";
import { login } from "../../redux/auth.slice";
import styles from "./LoginScreen.module.scss";

/**
 * TODO: Discard this after demo phase
 */
const DEMO_USER_NAME = "george.bluth@reqres.in";

const LoginScreen = () => {
  const { t } = useTranslation();
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading);
  useRedirectAfterLogin();

  const handleFinish = async (values: LoginRequestDef) => {
    const response = await dispatch(login(values));
    if (login.fulfilled.match(response)) {
      message.success(t("auth.messageSuccess"));
    } else {
      message.error(t("auth.messageError"));
    }
  };

  return (
    <Row justify="center" align="middle" className={styles.container}>
      <Col xs={24} sm={12} lg={6}>
        <Logo className={styles.logo} />
        <Card title={t("auth.loginTitle")}>
          <Form form={form} onFinish={handleFinish}>
            <Item
              name="email"
              label={t("auth.inputEmailLabel")}
              rules={[
                {
                  type: "email",
                  required: true,
                  whitespace: true,
                  message: t("default.inputErrorRequired"),
                },
              ]}
              initialValue={DEMO_USER_NAME}
            >
              <Input prefix={<UserOutlined />} type="text" />
            </Item>
            <Item
              name="password"
              label={t("auth.inputPasswordLabel")}
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: t("default.inputErrorRequired"),
                },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                {t("auth.loginButton")}
              </Button>
              <Link className={styles["float-right"]} to="/signup">
                {t("auth.signupButton")}
              </Link>
            </Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginScreen;
