# Устранение неполадок при деплое

## Ошибки при деплое

### Ошибка "The process '/usr/bin/git' failed with exit code 128"

Эта ошибка обычно возникает из-за проблем с правами доступа. Исправлено в обновленном workflow.

### Ошибка "Missing environment. Ensure your workflow's deployment job has an environment"

Эта ошибка возникает из-за отсутствия environment в workflow. Исправлено добавлением:

```yaml
environment:
  name: github-pages
  url: ${{ steps.deployment.outputs.page_url }}
```

### Что было исправлено:

1. **Обновлены версии Actions**:
   - `actions/checkout@v4` вместо v3
   - `actions/setup-node@v4` вместо v3
   - `actions/deploy-pages@v4` вместо peaceiris/actions-gh-pages

2. **Добавлены явные разрешения**:
   ```yaml
   permissions:
     contents: read
     pages: write
     id-token: write
   ```

3. **Добавлен environment**:
   ```yaml
   environment:
     name: github-pages
     url: ${{ steps.deployment.outputs.page_url }}
   ```

4. **Использован новый метод деплоя**:
   - `actions/configure-pages@v4`
   - `actions/upload-pages-artifact@v3`
   - `actions/deploy-pages@v4`

## Настройка GitHub Pages

### Важно: Используйте GitHub Actions

1. Перейдите в Settings → Pages
2. В разделе "Source" выберите **"GitHub Actions"**
3. НЕ выбирайте "Deploy from a branch"

### Если все еще возникают проблемы:

1. **Проверьте права репозитория**:
   - Убедитесь, что у вас есть права на запись в репозиторий
   - Проверьте, что GitHub Actions включены в настройках

2. **Очистите кэш**:
   - Перейдите в Settings → Actions → General
   - Нажмите "Clear cache"

3. **Проверьте workflow**:
   - Перейдите в Actions → Deploy to GitHub Pages
   - Посмотрите логи выполнения

## Альтернативный способ деплоя

Если GitHub Actions не работают, можно использовать ручной деплой:

```bash
# Установите gh-pages глобально
npm install -g gh-pages

# Соберите проект
npm run build

# Деплой
gh-pages -d dist
```

## Проверка после деплоя

1. Подождите 5-10 минут после пуша
2. Проверьте статус в Actions
3. Откройте ваш сайт на GitHub Pages
4. Проверьте консоль браузера на ошибки

