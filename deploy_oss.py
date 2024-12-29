import oss2
import os

# 替换为您的 OSS 配置
access_key_id = 'your_access_key_id'
access_key_secret = 'your_access_key_secret'
bucket_name = 'your_bucket_name'
endpoint = 'your_endpoint'  # 例如：oss-cn-hangzhou.aliyuncs.com

# 创建 Bucket 实例
auth = oss2.Auth(access_key_id, access_key_secret)
bucket = oss2.Bucket(auth, endpoint, bucket_name)

# 上传文件
def upload_file(local_file, oss_file):
    with open(local_file, 'rb') as f:
        bucket.put_object(oss_file, f)
    print(f'Uploaded {local_file} to {oss_file}')

# 上传目录
def upload_dir(local_dir, oss_dir=''):
    for root, dirs, files in os.walk(local_dir):
        for file in files:
            local_path = os.path.join(root, file)
            # 计算相对路径
            relative_path = os.path.relpath(local_path, local_dir)
            oss_path = os.path.join(oss_dir, relative_path).replace('\\', '/')
            upload_file(local_path, oss_path)

# 上传所有文件
upload_dir('.') 