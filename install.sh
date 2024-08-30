#!/bin/bash

# Định nghĩa URL để tải về Chrome
CHROME_URL="https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb"

# Định nghĩa tên file tải về
CHROME_DEB="google-chrome-stable_current_amd64.deb"

# Tải về file .deb của Chrome
echo "Đang tải về Google Chrome từ $CHROME_URL ..."
wget -O $CHROME_DEB $CHROME_URL

# Kiểm tra xem file đã được tải về thành công chưa
if [ -f "$CHROME_DEB" ]; then
    echo "Đã tải về thành công $CHROME_DEB"
else
    echo "Tải về thất bại. Vui lòng kiểm tra lại."
    exit 1
fi

# Cài đặt Google Chrome mà không sử dụng sudo
echo "Đang cài đặt Google Chrome ..."
dpkg -i $CHROME_DEB

# Cài đặt các phụ thuộc còn thiếu nếu có lỗi xảy ra trong quá trình cài đặt
if [ $? -ne 0 ]; then
    echo "Đang sửa chữa các phụ thuộc ..."
    apt-get install -f -y
fi

# Xóa file .deb sau khi cài đặt thành công
echo "Đang xóa file cài đặt ..."
rm -f $CHROME_DEB

echo "Cài đặt Google Chrome hoàn tất!"

npx puppeteer browsers install chrome
