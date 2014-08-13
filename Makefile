# Package Generator

PACKAGE = simple_todo
VERSION = `cat VERSION`
ITEMS = manifest.webapp index.html js css style icon locales

all:
	mkdir -p package
	cp -r $(ITEMS) package/
	cd package && zip -r tmp.zip *
	mv package/tmp.zip $(PACKAGE)-$(VERSION).zip

clean:
	rm -r package
	rm *.zip
