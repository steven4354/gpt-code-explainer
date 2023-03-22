find . -not -path '*/\.*' -not -path '*node_modules*' -not -path '*vendor*' -not -path '*image*' -not -path '*css*' -not -path '*svg*' -not -path '*png*' -not -path '*mp4*' | grep -v "/\..*/" | grep -v "^./\." | grep -v "\.css$" | grep -v "\.jpg$" | grep -v "\.min\.\(js\|css\)$" | grep -v "\.svg$" | grep -v "\.png$" | grep -v "\.mp4$" | pbcopy

find . -not -path '*/\.*' -not -path '*node_modules*' -not -path '*vendor*' -not -path '*image*' -not -path '*css*' -not -path '*svg*' -not -path '*png*' -not -path '*mp4*' | grep -v "/\..*/" | grep -v "^./\." | grep -v "\.css$" | grep -v "\.jpg$" | grep -v "\.min\.\(js\|css\)$" | grep -v "\.svg$" | grep -v "\.png$" | grep -v "\.mp4$" | awk -F/ '{
    indentation = ""
    for (i = 1; i < NF; i++) {
        indentation = indentation "  "
    }
    if (i == NF && $0 ~ /\/$/) {
        print indentation "- " substr($(NF), 1)
    } else {
        print indentation "  - " substr($(NF), 1)
    }
}' | pbcopy

find . -maxdepth 1 -not -path '*/\.*' -not -path '*node_modules*' -not -path '*vendor*' -not -path '*image*' -not -path '*css*' -not -path '*svg*' -not -path '*png*' -not -path '*mp4*' | grep -v "/\..*/" | grep -v "^./\." | grep -v "\.css$" | grep -v "\.jpg$" | grep -v "\.min\.\(js\|css\)$" | grep -v "\.svg$" | grep -v "\.png$" | grep -v "\.mp4$" | awk -F/ '{
    indentation = ""
    for (i = 1; i < NF; i++) {
        indentation = indentation "  "
    }
    if (i == NF && system(sprintf("test -d %s", $0)) == 0) {
        print indentation "- " substr($(NF), 1) "/"
    } else {
        print indentation "  - " substr($(NF), 1)
    }
}' | pbcopy