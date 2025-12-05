import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { loginApi } from "../../api/authApi";
import { useAuth } from "../../store/auth";
import { useNavigate } from "@tanstack/react-router";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuth((s) => s.login);

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = await loginApi({
        username: values.username,
        password: values.password,
        expoPushToken: "string",
        deviceID: "string",
      });

      if (data.isSuccessful) {
        login(data.token);
        navigate({ to: "/dashboard/items" });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center 
      px-4 py-10
      bg-linear-to-br from-black via-[#0a1627] to-[#12345a]"
    >
      <div
        className="
          w-full max-w-sm sm:max-w-md
          bg-[#0c1627]/85 backdrop-blur-md
          p-6 sm:p-8
          rounded-2xl
          border border-pink-500/30
          shadow-[0_0_35px_rgba(255,20,120,0.35)]
        "
      >
        {/* Title */}
        <h1
          className="
            text-center font-extrabold
            text-3xl sm:text-4xl md:text-5xl
            text-transparent bg-clip-text
            bg-linear-to-r from-[#6d9aff] to-[#ff65b8]
            drop-shadow-[0_0_15px_rgba(255,100,200,0.4)]
            mb-8
          "
        >
          Login
        </h1>

        <Form layout="vertical" onFinish={onFinish} className="space-y-4">
          {/* Username */}
          <Form.Item
            label={<span className="text-[#fdd6f4] text-sm sm:text-base">Username</span>}
            name="username"
            rules={[{ required: true, message: "Please enter username" }]}
          >
            <Input
              size="large"
              className="
                bg-[#0f223a] text-white
                border border-[#35496c]
                focus:border-pink-400
                rounded-lg
              "
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label={<span className="text-[#fdd6f4] text-sm sm:text-base">Password</span>}
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password
              size="large"
              className="
                bg-[#0f223a] text-white
                border border-[#35496c]
                focus:border-pink-400
                rounded-lg
              "
            />
          </Form.Item>

          {/* Button */}
          <Button
            htmlType="submit"
            type="primary"
            loading={loading}
            className="
              w-full py-2.5 sm:py-3
              bg-linear-to-r from-[#1b4d99] to-[#ff4fa3]
              hover:opacity-95
              border-none
              rounded-full
              font-semibold text-lg
              shadow-lg shadow-pink-600/40
              transition-all duration-300
            "
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
