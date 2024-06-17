export default {
    ok: 'ОК',
    cancel: 'Отмена',
    socketConnected: 'Event stream connected',
    socketDisconnected: 'Event stream disconnected',
    alert: {
        wrongLogin: 'Неверные данные для входа!',
    },
    button: {
        login: 'Логин',
        home: 'Домашняя страница',
        player: 'Плеер',
        media: 'Файлы',
        message: 'Сообщение',
        logging: 'Логи',
        channels: 'Каналы',
        configure: 'Конфигурация',
        logout: 'Выйти',
    },
    error: {
        notFound: 'Страница не найдена',
        serverError: 'Внутреняя серверная ошибка',
    },
    input: {
        username: 'Логин',
        password: 'Пароль',
    },
    system: {
        cpu: 'Процессор',
        cores: 'Ядра',
        load: 'Нагрузка',
        memory: 'Оперативная память',
        swap: 'Swap',
        total: 'Всего',
        usage: 'Используется',
        network: 'Интернет',
        in: 'Прием',
        out: 'Отдача',
        storage: 'Хранилище',
        device: 'Устройство',
        size: 'Размер',
        used: 'Использовано',
    },
    control: {
        noClip: 'На данный момент ни один файл не воспроизводится',
        ingest: 'Прямой эфир/Перехват эфира',
        start: 'Запустить Playout Service',
        last: 'Переключить на предыдущий файл',
        stop: 'Остановить Playout Service',
        reset: 'Сбросить Playout State',
        restart: 'Перезапустить Playout Service',
        next: 'Переключить на следующий файл',
    },
    player: {
        start: 'Начало',
        file: 'Файл',
        play: 'Проиграть',
        title: 'Название файла',
        duration: 'Длительность',
        in: 'Начало',
        out: 'Конец',
        ad: 'Реклама',
        edit: 'Редактировать',
        delete: 'Удалить',
        copy: 'Скопировать плейлист',
        loop: 'Повторить все видео в плейлисте',
        remote: 'Добавить (удаленно) файл в плейлист',
        import: 'Загрузить text/m3u файл',
        generate: 'Простой и продвинутый генератор плейлистов',
        reset: 'Сбросить плейлист',
        save: 'Сохранить плейлист',
        deletePlaylist: 'Удалить плейлист',
        unsavedProgram: 'Этот плейлист не сохранен!',
        copyTo: 'Скопировать текущую программу за',
        addEdit: 'Добавить/Редактировать файл',
        audio: 'Звук',
        customFilter: 'Пользовательский фильтр',
        deleteFrom: 'Удалить плейлист за',
        deleteSuccess: 'Плейлист удален...',
        generateProgram: 'Генерация плейлиста',
        simple: 'Простой',
        advanced: 'Расширенный',
        sorted: 'Отсортировать',
        shuffle: 'Перемещать/Перетасовать',
        shift: 'Перемотка',
        all: 'Все',
        addBlock: 'Добавить время начало передачи',
        infinitInfo: 'Воспроизведение работает в бесконечном режиме. Никакая информация, основанная на времени, невозможна.',
        generateDone: 'Генерация плейлиста завершена...',
    },
    media: {
        notExists: 'Папки не существует!',
        create: 'Сделать папку',
        upload: 'Загрузить файлы',
        deleteTitle: 'Удалить Файл/Папку',
        deleteQuestion: 'Вы уверены что хотите это удалить',
        preview: 'Просмотр',
        rename: 'Переименовать файл',
        newFile: 'Название нового файла',
        createFolder: 'Сделать папку',
        foldername: 'Имя папки',
        current: 'Процесс загрузки',
        overall: 'Всего',
        uploading: 'Загружается',
        moveError: 'Move error',
        deleteError: 'Ошишка удаления',
        folderExists: 'Папка уже имеется!',
        folderCreate: 'Создание папки готово...',
        folderError: 'Ошибка Создания папки',
        uploadError: 'Ошибка Загрузки',
        fileExists: 'Файл уже имеется!',
    },
    message: {
        savePreset: 'Сохранить шаблон',
        newPreset: 'Новый шаблон',
        delPreset: 'Удалить шаблон',
        delText: 'Вы уверены что хотите удалить шаблон',
        placeholder: 'Текст',
        xAxis: 'X Axis',
        yAxis: 'Y Axis',
        showBox: 'Текст с фоном',
        boxColor: 'Цвет фона для текста',
        boxAlpha: 'Прозрачность фона для текста',
        size: 'Размер',
        spacing: 'Spacing',
        overallAlpha: 'Overall Alpha',
        fontColor: 'Цвет текста',
        fontAlpha: 'Font Alpha',
        borderWidth: 'Border Width',
        send: 'Отправить в эфир',
        name: 'Название',
        saveDone: 'Сохранение предустановки выполнено!',
        saveFailed: 'Сохранить пресет не удалось!',
        sendDone: 'Отправка успешна...',
        sendFailed: 'Отправка не удалась...',
    },
    log: {
        download: 'Скачать лог файл',
    },
    advanced: {
        title: 'Advanced Configuration',
        decoder: 'Decoder',
        encoder: 'Encoder',
        filter: 'Filter',
        ingest: 'Ingest',
        updateSuccess: 'Update advanced config success!',
        updateFailed: 'Update advanced config failed!',
    },
    config: {
        channel: 'Канал',
        user: 'Юзер',
        channelConf: 'Конфигурация канала',
        addChannel: 'Сделать новый канал',
        name: 'Название канала',
        previewUrl: 'Предварительный просмотр эфира канала по URL',
        extensions: 'Дополнительные расширения',
        save: 'Сохранить',
        delete: 'Удалить',
        updateChannelSuccess: 'Обновление конфигурации канала успешно!',
        updateChannelFailed: 'Обновление конфигурации канала не получилось!',
        errorChannelDelete: 'Первый канал не может быть удален!',
        deleteChannelSuccess: 'Удаление канала успешно!',
        deleteChannelFailed: 'Удаление канала неуспешно!',
        playoutConf: 'Настройки Конфигурации',
        general: 'Главное',
        rpcServer: 'RPC Сервер',
        mail: 'Электронная почта',
        logging: 'Логирование',
        processing: 'Настройки эфира',
        ingest: 'Ingest',
        playlist: 'Плейлист',
        storage: 'Storage',
        text: 'Текст',
        task: 'Task',
        out: 'Out',
        placeholderPass: 'Password',
        help: 'Help',
        generalText: `Sometimes it can happen that a file is corrupted but still playable, this can cause a streaming error on all following files. The only way to fix this is to stop and restart ffplayout. Here we only say when to stop, the starting process is up to you. The best way is a systemd service on Linux.
        'stop_threshold' will stop ffplayout if it is async in time above this value. A number less than 3 may cause unexpected errors.`,
        rpcText: 'Запустите сервер JSON RPC, чтобы получить информацию о том, что воспроизводится, а также о некоторых функциях управления.',
        mailText: `Отправлять сообщения об ошибках на адрес электронной почты, например об отсутствии списка воспроизведения; неверный формат json; отсутствует путь к клипу. Оставьте получателя пустым, если он вам не нужен. 'mail_level' может быть ИНФОРМАЦИЯ, ПРЕДУПРЕЖДЕНИЕ или ОШИБКА. 'interval' означает секунды до отправки нового письма.`,
        logText: `If 'log_to_file' is true, log to file, if false, log to console. 'local_time' to false will set log timestamps to UTC. Path to /var/log/ only if you are running this as a daemon.
        'level' can be DEBUG, INFO, WARNING, ERROR. 'ffmpeg_level' can be INFO, WARNING, ERROR. 'detect_silence' logs an error message if the audio line is silent for 15 seconds during the validation process.`,
        processingText: `Default processing for all clips to make them unique. Mode can be Playlist or Folder. 'aspect' must be a float number. 'logo' is only used if the path exists.
        'logo_scale' scales the logo to the target size, leave empty if no scaling is needed, format is 'width:height', for example '100:-1' for proportional scaling. With 'logo_opacity' you can make the logo transparent.
        With 'audio_tracks' it is possible to configure how many audio tracks should be processed. 'audio_channels' can be used if the audio has more channels than just stereo. With 'logo_position' in 'x:y' format you set the logo position. With 'custom_filter' it is possible to apply additional filters. The filter outputs should end with [c_v_out] for video filters and [c_a_out] for audio filters.`,
        ingestText: `Запустите сервер для получения входящего потока. Этот поток будет переопределять обычную потоковую передачу до тех пор, пока она не будет завершена. Существует только очень простой механизм аутентификации, позволяющий проверить правильность имени потока. 'custom_filter' можно использовать так же, как в разделе "Настройки эфира".`,
        playlistText: `'path' can be a path to a single file or a directory. For directory specify only the root folder, for example '/playlists', subdirectories will be read by the program. Subdirectories need this structure '/playlists/2018/01'.
        'day_start' is the time at which the playlist should start, leave 'day_start' empty if the playlist should always start at the beginning. 'length' represents the target length of the playlist, if empty, real length will not be considered. 'infinit: true' works with single playlist file and loops it infinitely.`,
        storageText: `Play ordered or random files from path. 'filler_clip' is for filling the end to reach 24 hours, it will loop when necessary. Set 'extensions' to search only for files with that extension. Set 'shuffle' to 'true' to select files randomly.`,
        textText: `Overlay text in combination with libzmq for remote text manipulation. On Windows, the font file path must be 'C\\:/WINDOWS/fonts/DejaVuSans.ttf'. 'text_from_filename' activates text extraction from a filename. With 'style' you can set the drawtext parameters like position, color, etc. Post Text via API will override this. With 'regex' you can format the filename to get a title.`,
        taskText: `Run an external program with a given media object. The media object is in json format and contains all the information about the current clip. The external program can be a script or a binary. or a binary, but should only run for a short time.`,
        outText: `The final playout compression. Adjust the settings according to your needs. 'mode' has the options 'desktop', 'hls', 'null', 'stream'. Use 'stream' and adjust the 'output_param:' settings if you want to stream to an rtmp/rtsp/srt/... server. In production don't serve hls playlist with ffpapi, use nginx or another web server!`,
        restartTile: 'Перезапуск Playout',
        restartText: 'Перезапустить ffplayout для применения изменений?',
        updatePlayoutSuccess: 'Обновление конфигурации воспроизведения прошло успешно!',
        updatePlayoutFailed: 'Обновление конфигурации воспроизведения не удалось!',
        forbiddenPlaylistPath: 'Доступ запрещен: Папка плейлиста не может быть открыта.',
        noPlayoutConfig: 'Конфигурация воспроизведения не найдена!',
    },
    user: {
        title: 'Конфигурация пользователя',
        add: 'Добавить пользователя',
        delete: 'Удалить пользователя',
        name: 'Имя пользователя',
        mail: 'Электронная почта',
        password: 'Пароль',
        newPass: 'Новый пароль',
        confirmPass: 'Подтвердите пароль',
        save: 'Сохранить',
        admin: 'Админ',
        deleteNotPossible: 'Delete current user not possible!',
        deleteSuccess: 'Удаление пользователя успешно!',
        deleteError: 'Удаление пользователя с ошибкой',
        addSuccess: 'Добавление пользователя успешно!',
        addFailed: 'Добавление пользователя не успешно!',
        mismatch: 'Password mismatch!',
        updateSuccess: 'Обновление данных о пользователе успешно!',
        updateFailed: 'Обновление данных о пользователе не успешно!',
    },
}
