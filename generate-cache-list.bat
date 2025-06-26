@echo off
setlocal EnableDelayedExpansion

set OUTPUT_FILE=cache-list.json

:: 開始寫入 JSON 陣列開頭
echo [ > %OUTPUT_FILE%

:: 初始化變數
set firstLine=true

:: 遞迴掃描檔案
for /R %%f in (*) do (
    set "filepath=%%f"
    set "relpath=%%f"
    set "relpath=!relpath:%CD%\=!"

    :: 去除開頭反斜線
    if "!relpath:~0,1!"=="\" set "relpath=!relpath:~1!"

    :: 替換反斜線為正斜線
    set "relpath=!relpath:\=/!"

    :: 忽略 .git 資料夾與這個 .bat 自己
    echo !relpath! | findstr /I /C:".git/" >nul
    if errorlevel 1 (
        if /I not "!relpath!"=="generate-cache-list.bat" (
            if "!firstLine!"=="true" (
                echo   "!relpath!" >> %OUTPUT_FILE%
                set firstLine=false
            ) else (
                echo , "!relpath!" >> %OUTPUT_FILE%
            )
        )
    )
)

:: 結束 JSON 陣列
echo ] >> %OUTPUT_FILE%

echo.
echo ✅ 已產生 cache-list.json
pause
