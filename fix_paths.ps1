$path = 'c:\Users\HP\Ideamagix copy\Netflix\src\js\main.js'
$content = Get-Content $path -Raw
$content = $content.Replace("'/public/", "'")
$content = $content.Replace('"/public/', '"')
$content = $content.Replace("'/trailer/", "'trailer/")
$content = $content.Replace('"/trailer/', '"trailer/')
Set-Content $path $content -NoNewline
