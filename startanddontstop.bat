@echo off
:1
node index.js
if %ERRORLEVEL% equ 10 (
    echo Exiting because i!scheduleshutdown was used
    exit
)
goto 1