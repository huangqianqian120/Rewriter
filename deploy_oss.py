import oss2
import os
from pathlib import Path

def deploy_to_oss():
    # OSS配置
    access_key_id = os.getenv('OSS_ACCESS_KEY_ID')
    access_key_secret = os.getenv('OSS_ACCESS_KEY_SECRET')
    bucket_name = os.getenv('OSS_BUCKET_NAME')
    endpoint = os.getenv('OSS_ENDPOINT')

    # 创建Bucket实例
    auth = oss2.Auth(access_key_id, access_key_secret)
    bucket = oss2.Bucket(auth, endpoint, bucket_name)

    # 源文件目录
    src_dir = Path('../src')

    # 上传文件
    for file_path in src_dir.rglob('*'):
        if file_path.is_file():
            remote_path = str(file_path.relative_to(src_dir))
            print(f'Uploading {remote_path}...')
            bucket.put_object_from_file(remote_path, str(file_path))

if __name__ == '__main__':
    deploy_to_oss() 