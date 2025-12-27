@echo off
setlocal enabledelayedexpansion

:: ==============================
:: Set global color
:: ==============================
:: 0 = black background, A = green text
color 0A

:: ==============================
:: Welcome message
:: ==============================
echo =====================================
echo      File Name to URL List Tool
echo =====================================
echo.
echo Instructions:
echo 1. Drag the folder to scan
echo 2. Drag the folder to save the result
echo 3. Enter file type to filter (e.g., png), leave empty for all files
echo 4. Enter prefix URL (optional)
echo.
pause

:: ==============================
:: 1. Input folder to scan
:: ==============================
echo [INFO] Please drag the folder to scan and press Enter:
set /p srcfolder=
set srcfolder=!srcfolder:"=!
if not exist "!srcfolder!" (
    echo [ERROR] Folder does not exist. Exiting.
    pause
    exit /b
)

:: ==============================
:: 2. Input folder to save result
:: ==============================
echo [INFO] Please drag the folder to save the result and press Enter:
set /p destfolder=
set destfolder=!destfolder:"=!
if not exist "!destfolder!" (
    echo [ERROR] Save folder does not exist. Exiting.
    pause
    exit /b
)

:: ==============================
:: 3. Input file type filter
:: ==============================
set /p ext=Enter file type to filter (e.g., png), leave empty for all files: 

:: ==============================
:: 4. Input prefix URL (optional)
:: ==============================
set /p prefix=Enter prefix URL (e.g., https://cdn.example.com, trailing '/' will be handled automatically): 

:: ==============================
:: Generate output TXT file path
:: ==============================
for %%a in ("!srcfolder!") do set foldername=%%~nxa
set outputfile=!destfolder!\!foldername!.txt

:: ==============================
:: 5. Iterate folder and generate URLs
:: ==============================
echo [INFO] Generating URL list...

set firstline=1

if "!ext!"=="" (
    for %%f in ("!srcfolder!\*") do (
        set filename=%%~nxf
        if "!prefix!"=="" (
            set url=!filename!
        ) else (
            set url=!prefix!/!filename!
        )
        if !firstline! equ 1 (
            >"!outputfile!" echo !url!
            set firstline=0
        ) else (
            >>"!outputfile!" echo !url!
        )
    )
) else (
    for %%f in ("!srcfolder!\*.!ext!") do (
        set filename=%%~nxf
        if "!prefix!"=="" (
            set url=!filename!
        ) else (
            set url=!prefix!/!filename!
        )
        if !firstline! equ 1 (
            >"!outputfile!" echo !url!
            set firstline=0
        ) else (
            >>"!outputfile!" echo !url!
        )
    )
)

:: ==============================
:: Completion message
:: ==============================
echo.
echo [DONE] URL list generated:
echo [DONE] !outputfile!
echo.
pause
