import { useState } from "react";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Col, Input, message, Row } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Button from "@app/components/atoms/Button/Button";
import Form, { Item, useForm } from "@app/components/atoms/Form/Form";
import { SignupRequestDef } from "@app/features/auth/auth";

import { authSignup } from "../../api/auth.api";
import styles from "./SignupScreen.module.scss";

const SignupScreen = () => {
  const { t } = useTranslation();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: SignupRequestDef) => {
    setLoading(true);
    const reqPayload = values;
    delete reqPayload.confirmPassword;
    try {
      await authSignup(reqPayload);
      message.success(t("auth.signupMessageSuccess"));
      form.resetFields();
    } catch (error) {
      message.error(t("auth.signupMessageError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" align="middle" className={styles.container}>
      <Col xs={24} sm={12} lg={6}>
        <Card title={t("auth.signupTitle")}>
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
            <Item
              name="confirmPassword"
              label={t("auth.inputConfirmPasswordLabel")}
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: t("default.inputErrorRequired"),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                {t("auth.signupButton")}
              </Button>
              <Link className={styles["float-right"]} to="/login">
                {t("auth.loginButton")}
              </Link>
            </Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default SignupScreen;
