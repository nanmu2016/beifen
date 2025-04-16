import React from 'react';
import { Outlet } from 'react-router-dom'; // 用于渲染子路由组件
import { useSystemSettings } from '@nocobase/client'; // 获取系统设置数据
import { AuthenticatorsContextProvider } from '@nocobase/plugin-auth/client' // 提供认证上下文

import authImg from './auth-image.jpg' // 导入背景图片

export function CustomAuthLayout() {
  // 获取系统设置数据,包含网站标题等信息
  const { data } = useSystemSettings();

  return (
    <div style={{
      position: 'relative', // 相对定位,作为子元素的定位参考
      width: '100vw', // 宽度100%视窗
      height: '100vh', // 高度100%视窗
      overflow: 'hidden' // 超出隐藏
    }}>
      {/* 背景图片容器 */}
      <div style={{
        position: 'absolute', // 绝对定位
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1 // 层级1,在登录框下方
      }}>
        <img src={authImg} style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover', // 图片填充方式
          objectPosition: 'center' // 图片居中
        }} />
      </div>
      
      {/* 登录框容器 */}
      <div style={{
        position: 'absolute', // 绝对定位
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', // 居中定位
        zIndex: 2, // 层级2,在背景图片上方
        background: 'rgba(255, 255, 255, 0.9)', // 半透明白色背景
        padding: '2rem',
        borderRadius: '8px', // 圆角边框
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // 阴影效果
        backdropFilter: 'blur(10px)', // 背景模糊效果
        maxWidth: '400px', // 最大宽度
        width: '90%' // 响应式宽度
      }}>
        {/* 显示系统标题 */}
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>{data?.data?.title}</h1>
        {/* 认证上下文提供者,包裹子路由组件 */}
        <AuthenticatorsContextProvider>
          <Outlet />
        </AuthenticatorsContextProvider>
      </div>
    </div>
  );
}
