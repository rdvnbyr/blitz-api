#"c:\windows\System32\OpenSSH\ssh.exe" root -L 3306:localhost:3306 45.85.147.125
# ssh root -L 3306:localhost:3306 45.85.147.125 -N -f
ssh -L 3306:localhost:3306 root@45.85.147.125 -N -f
