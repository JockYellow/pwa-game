@echo off
setlocal EnableDelayedExpansion

:: 檔案名稱
set OUTPUT_FILE=cache-list.json

:: 初始化 JSON 字串
echo [ > %OUTPUT_FILE%

:: 遍歷所有檔案
for /R %%f in (*) do (
    set "filepath=%%f"
    set "relpath=%%f"
    set "relpath=!relpath:%CD%\=!"

    :: 移除開頭反斜線
    if "!relpath:~0,1!"=="\" set "relpath=!relpath:~1!"

    :: 替換為正斜線
    set "relpath=!relpath:\=/!"

    :: 排除自己重複寫入（最後統一加）
    if /I not "!relpath!"=="%OUTPUT_FILE%" (
        echo   "!relpath!", >> %OUTPUT_FILE%
    )
)

:: 最後加上自己
echo   "%OUTPUT_FILE%" >> %OUTPUT_FILE%

:: 收尾
echo ] >> %OUTPUT_FILE%

echo.
echo ✅ cache-list.json 已產生。
pause
