<<<<<<< HEAD
# beifen
=======
# NocoBase Plugin Samples

[Document](https://docs.nocobase.com/plugin-samples)

## Install

```bash
yarn install
yarn nocobase install
```

## Add Plugin

### Via CLI

```bash
yarn pm add plugin-package-name
yarn pm enable plugin-package-name
```

Example：

```bash
yarn pm add @nocobase-sample/plugin-add-page
yarn pm enable @nocobase-sample/plugin-add-page
```

### Via `.env` file

```
APPEND_PRESET_BUILT_IN_PLUGINS=@nocobase-sample/plugin-add-page,@nocobase-sample/plugin-block-carousel
```

## DEV

```bash
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.
>>>>>>> 7e945d1 (水印插件完善)
