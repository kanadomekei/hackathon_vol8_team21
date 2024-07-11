FROM mysql:8.0

# 環境変数の設定
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=sample
ENV MYSQL_PASSWORD=password

# 必要なポートを公開
EXPOSE 3306

# デフォルトのコマンドを上書き
CMD ["mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]