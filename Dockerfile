FROM nginx:alpine

# 删除默认的 nginx 静态文件
RUN rm -rf /usr/share/nginx/html/*

# 复制项目文件到容器中
COPY index.html /usr/share/nginx/html/
COPY styles/ /usr/share/nginx/html/styles/
COPY scripts/ /usr/share/nginx/html/scripts/

# 配置 nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 80 端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"] 