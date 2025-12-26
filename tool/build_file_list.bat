@echo off
title 生成带前缀链接的列表
color 0A
setlocal enabledelayedexpansion

:: 1. 说明
echo 使用方法：
echo   把要扫描的文件夹直接拖到下面窗口，回车；
echo   再把保存txt的文件夹拖到下面窗口，回车;
echo   输入要筛选的后缀（直接回车 = 扫描全部），回车;
echo   输入前缀链接（可空）：输入要加在文件名前的链接（如 https://cdn.jsdelivr.net/gh/o0w0b/StaticFiles@main/img/）
echo.

:: 1. 拖扫描目录
set /p "src=① 把【扫描目录】拖进来然后回车："
if not exist "%src%" (echo 路径不存在 & pause & exit /b)
for %%A in ("%src%") do set "dirName=%%~nA"

:: 2. 拖保存目录
set /p "dst=② 把【保存目录】拖进来然后回车："
if not exist "%dst%" (echo 路径不存在 & pause & exit /b)

:: 3. 后缀
set /p ext=③ 要筛选的后缀（直接回车 = 扫描全部）：
if "%ext%"=="" (set "mask=*") else set "mask=*.%ext%"

:: 4. 输入前缀链接
set /p prefix=④ 要在文件名前加的链接（末尾有无/均可）：
if "%prefix:~-1%"=="\" set "prefix=%prefix:~0,-1%"
if "%prefix:~-1%"=="/" set "prefix=%prefix:~0,-1%"

:: 5. 生成列表：链接+文件名
set "txtPath=%dst%\%dirName%.txt"
(for %%F in ("%src%\%mask%") do echo %prefix%/%%~nxF) > "%txtPath%"

echo.
echo 完成！已生成：
echo   %txtPath%
pause