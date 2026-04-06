/**
 * OBP Tool Key Taxonomy — ビジネスドメイン操作の全語彙
 *
 * ════════════════════════════════════════════════════════════════════
 * 【設計原則】
 *
 *   OBP（Open Business Protocol）は ISO のような規格である。
 *   完全・網羅的だが、具体的な実装詳細には踏み込まない。
 *   国・言語・時間・技術スタックを超えて通用する普遍的プロトコル。
 *   OBP = ビジネスの DNA。この名前空間が操作の全宇宙（universe）を表現する。
 *
 *   OBP 四大元素（Root Categories・哲学層）:
 *     being.*    — WHO（存在・主体）人間/AI/組織を等しく包含
 *     resource.* — WHAT（資産・価値・物）
 *     flow.*     — HOW/WHEN（動態・手順・時間）
 *     context.*  — WHERE/WHY（境界・状況・意味）
 *   ※ being.* は OBP 哲学層にのみ存在。World Filter が具現化する。
 *
 *   Flapbase は OBP を継承・拡張した World Filter（世界フィルター）。
 *   SMB 向けエージェント×ノーコード SaaS として OBP を解釈・具現化する。
 *   OBP の being.* を agent.* として実装する（Type 4: Root Category 具現型）。
 *
 *   Tool Key の四類型:
 *     Type 1: OBP 直接実装   data.vdb_query ← data.*
 *     Type 2: OBP 原型継承   builder.*      ← being.configure
 *     Type 3: WF 遷移型      connector.slack.* ← connector.*（brand name boundary）
 *     Type 4: Root 具現型    agent.*        ← being.*（Flapbase = AI agent World）
 *
 *   ドット記法の抽象勾配（左 = OBP 普遍 → 右 = World Filter 固有）:
 *     connector              ← 抽象（OBP 層）
 *     connector.slack        ← 遷移点（Slack = 外部ブランド名）
 *     connector.slack.send_message  ← World Filter の具体実装
 *
 * ════════════════════════════════════════════════════════════════════
 *
 * 命名規則:
 *   2段階: `{category}.{verb}_{object}`
 *   3段階: `{category}.{provider}.{verb}_{object}`（connector.* のみ）
 *
 * 変更時の手順:
 *   1. このファイルを編集
 *   2. `pnpm --filter @obp/core build`
 *   3. EF switch / ToolTestLabPage TOOLS 配列も合わせて更新
 *
 * Package: @obp/core (MIT)
 */

// ---------------------------------------------------------------------------
// Type utilities
// ---------------------------------------------------------------------------

type FlattenLeaves<T> = T extends string
  ? T
  : { [K in keyof T]: FlattenLeaves<T[K]> }[keyof T]

// ---------------------------------------------------------------------------
// Tool key constants (as const → literal type inference)
// ---------------------------------------------------------------------------

// ===========================================================================
// OBP ABSTRACT LAYER — 普遍・不変・長期間持続する原始操作
// どのビジネス OS でも実装できる汎用動詞のみを収録する。
// ===========================================================================

export const OBP_TOOL_KEYS = {

  // ── data.* ────────────────────────────────────────────────────────────────
  /** VDB (Virtual Database) 低レベル CRUD / VDB セマンティック操作 */
  data: {
    /** レコード読み取り（フィルタ・ページング）*/
    vdb_query:           'data.vdb_query',
    /** レコード新規作成 */
    vdb_insert:          'data.vdb_insert',
    /** レコード更新 */
    vdb_update:          'data.vdb_update',
    /** レコード削除 */
    vdb_delete:          'data.vdb_delete',
    /** ベクトルセマンティック検索 */
    vdb_search:          'data.vdb_search',
    /** ベクトルセマンティック検索（100ユースケース文書互換エイリアス）*/
    vdb_semantic_search: 'data.vdb_semantic_search',
    /** レコード一覧取得 */
    vdb_list:            'data.vdb_list',
    /** upsert（ID 一致なら update、なければ insert）*/
    vdb_upsert:          'data.vdb_upsert',
    /** スキーマ型付きレコード作成 */
    vdb_create_typed:    'data.vdb_create_typed',
    /** VDB リレーション登録 */
    vdb_link:            'data.vdb_link',
    /** VDB リレーション取得 */
    vdb_get_relations:   'data.vdb_get_relations',
    /** セマンティック検索（data.vdb_search の WF DSL 向けエイリアス）*/
    semantic_search:     'data.semantic_search',
    /** upsert（data.vdb_upsert の WF DSL 向けエイリアス）*/
    upsert:              'data.upsert',
    /** query（data.vdb_query の WF DSL 向けエイリアス）*/
    query:               'data.query',
    /** VDB スキーマ定義を直接作成（vapp.generate を使わない低レベル操作）*/
    schema_create:       'data.schema_create',
    /** VSV 作成 — Phase 4 */
    vsv_create:          'data.vsv_create',
    /** VSV クエリ — Phase 4 */
    vsv_query:           'data.vsv_query',
    /** VSV コミット — Phase 4 */
    vsv_commit:          'data.vsv_commit',
  },

  // ── change.* ──────────────────────────────────────────────────────────────
  /** Change Request 管理 */
  change: {
    /** 変更リクエスト作成 */
    create: 'change.create',
  },

  // ── project.* ─────────────────────────────────────────────────────────────
  /** プロジェクト・課題・スケジュール管理 */
  project: {
    /** プロジェクト一覧 */
    list:             'project.list',
    /** 課題一覧 */
    issue_list:       'project.issue_list',
    /** 課題作成 */
    issue_create:     'project.issue_create',
    /** 課題更新 */
    issue_update:     'project.issue_update',
    /** 課題削除 */
    issue_delete:     'project.issue_delete',
    /** タスクアラート一覧 */
    task_alerts_list: 'project.task_alerts_list',
    /** スケジュール一覧 */
    schedule_list:    'project.schedule_list',
    /** スケジュール作成 */
    schedule_create:  'project.schedule_create',
    /** スケジュール更新 */
    schedule_update:  'project.schedule_update',
    /** スケジュール削除 */
    schedule_delete:  'project.schedule_delete',
  },

  // ── vapp.* ────────────────────────────────────────────────────────────────
  /** VApp 定義 生成・分析・修正 */
  vapp: {
    /** VApp 構造分析 */
    analyze:       'vapp.analyze',
    /** VApp 定義生成 */
    generate:      'vapp.generate',
    /** VApp 定義修正 */
    modify:        'vapp.modify',
    /** VApp View スキーマ生成 */
    view_generate: 'vapp.view_generate',
  },

  // ── context.* ─────────────────────────────────────────────────────────────
  /**
   * Adaptive Context Engine (ACE)
   * コンテキスト知覚・抽出・コンパイル・整合性チェック・美学定義
   */
  context: {
    /** VDB / プロジェクト状態からコンテキスト抽出 */
    extract:   'context.extract',
    /** コンテキストコンパイル（WS + Project + Exec param 統合）*/
    compile:   'context.compile',
    /** コンテキスト再ランキング用フィードバック */
    feedback:  'context.feedback',
    /** 外部シグナル・環境情報の知覚（イベント・市場・ユーザー行動）*/
    sense:     'context.sense',
    /** ゴール・制約との整合性チェック（OBP: context.align）*/
    align:     'context.align',
    /** ブランドトーン・文体・美学の定義（コンテンツ生成品質の基準）*/
    aesthetic: 'context.aesthetic',
  },

  // ── ai.* ──────────────────────────────────────────────────────────────────
  /** LLM / AI 生成操作 */
  ai: {
    /** テキスト生成 */
    text_generate:    'ai.text_generate',
    /** テキスト要約 */
    text_summary:     'ai.text_summary',
    /** テキスト分類 */
    text_classify:    'ai.text_classify',
    /** テキスト構造抽出 */
    text_extract:     'ai.text_extract',
    /** テキスト翻訳 */
    text_translate:   'ai.text_translate',
    /** 画像生成 */
    image_generate:   'ai.image_generate',
    /** 画像解析 */
    image_analyze:    'ai.image_analyze',
    /** 音声書き起こし */
    audio_transcribe: 'ai.audio_transcribe',
    /** エンベディング作成 */
    embedding_create: 'ai.embedding_create',
    /** 分類（text_classify の短縮エイリアス）*/
    classify:         'ai.classify',
    /** 抽出（text_extract の短縮エイリアス）*/
    extract:          'ai.extract',
    /** 翻訳（text_translate の短縮エイリアス）*/
    translate:        'ai.translate',
  },

  // ── notify.* ──────────────────────────────────────────────────────────────
  /** 通知配信（Webhook 通知・Slack webhook など一方向送信）*/
  notify: {
    /** Slack Webhook 通知 */
    slack:   'notify.slack',
    /** メール送信 */
    email:   'notify.email',
    /** 任意 Webhook 送信 */
    webhook: 'notify.webhook',
    /** プラットフォーム内通知 */
    in_app:  'notify.in_app',
  },

  // ── web.* ─────────────────────────────────────────────────────────────────
  /** Web データ取得（汎用）*/
  web: {
    /** Web 検索 */
    search: 'web.search',
    /** URL フェッチ */
    fetch:  'web.fetch',
    /** Webスクレイピング */
    scrape: 'web.scrape',
  },

  // ── research.* ────────────────────────────────────────────────────────────
  /** Web 調査・監視（エージェント向け高機能 Web ツール）*/
  research: {
    /** URL コンテンツ取得 */
    web_fetch:    'research.web_fetch',
    /** Web 検索 */
    web_search:   'research.web_search',
    /** コンテンツ差分検出 */
    diff_content: 'research.diff_content',
    /** URL 定期監視登録 */
    monitor_url:  'research.monitor_url',
  },

  // ── intel.* ───────────────────────────────────────────────────────────────
  /** Platform Intelligence Lake — 収集・配信 */
  intel: {
    /** インテリジェンスフィード取得（WS ユーザー向け）*/
    get_feed:        'intel.get_feed',
    /** フィードエントリ既読マーク */
    mark_read:       'intel.mark_read',
    /** フィードエントリピン止め */
    pin:             'intel.pin',
    /** インテリジェンス収集実行（プラットフォーム管理者 / cron）*/
    collect:         'intel.collect',
    /** 収集結果ファンアウト */
    fanout:          'intel.fanout',
    /** 全文テキスト取得 */
    fetch_full_texts: 'intel.fetch_full_texts',
  },

  // ── social.* ──────────────────────────────────────────────────────────────
  /** ソーシャルメディア操作 */
  social: {
    /** Twitter/X 投稿 */
    twitter_post:    'social.twitter_post',
    /** Twitter/X 検索 */
    twitter_search:  'social.twitter_search',
    /** Instagram 投稿 */
    instagram_post:  'social.instagram_post',
    /** LinkedIn 投稿 */
    linkedin_post:   'social.linkedin_post',
    /** ソーシャルキュレーション（マルチソース収集・整理）*/
    curate:          'social.curate',
  },

  // ── grok.* ────────────────────────────────────────────────────────────────
  /** Grok / X ライブ検索 */
  grok: {
    /** リアルタイム Web 検索 */
    live_search: 'grok.live_search',
  },

  // ── flow.* ────────────────────────────────────────────────────────────────
  /** ワークフロー制御フロープリミティブ */
  flow: {
    conditional:   'flow.conditional',
    loop:          'flow.loop',
    parallel:      'flow.parallel',
    wait:          'flow.wait',
    transform:     'flow.transform',
    merge:         'flow.merge',
    /** Principal（人間）への主権的委譲。エージェントが自律範囲を超えた判断を要求する */
    delegate:      'flow.delegate',
    /** 時間条件付き実行トリガー（cron / 指定時刻 / 繰り返し）*/
    schedule:      'flow.schedule',
    /** Human-in-the-loop 承認待機（flow.delegate の HITL 特化エイリアス）*/
    wait_approval: 'flow.wait_approval',
    /** 複数フロー出力の合成（並列実行結果をマージして次ステップへ）*/
    compose:       'flow.compose',
  },

  // ── agent.* ───────────────────────────────────────────────────────────────
  /** エージェント呼び出し・内省 */
  agent: {
    /** スキル実行 */
    call_skill:    'agent.call_skill',
    /** 別エージェントへのハンドオフ */
    handoff:       'agent.handoff',
    /** サブエージェント起動 */
    spawn:         'agent.spawn',
    /** 記憶想起 */
    recall:        'agent.recall',
    /** 自己振り返り（成功パターン蒸留）*/
    retrospective: 'agent.retrospective',
    /** 自律性レベル自己報告 */
    self_report:   'agent.self_report',
    /** 別エージェント / スキルへの明示的呼び出し（agent.call_skill の高レベルエイリアス）*/
    invoke:        'agent.invoke',
  },

  // ── memory.* ──────────────────────────────────────────────────────────────
  /** エージェントメモリ読み書き */
  memory: {
    save:   'memory.save',
    load:   'memory.load',
    search: 'memory.search',
    clear:  'memory.clear',
  },

  // ── lifecycle.* ───────────────────────────────────────────────────────────
  /** エージェント日次ライフサイクル */
  lifecycle: {
    /** 朝のブリーフィング */
    morning_briefing:   'lifecycle.morning_briefing',
    /** 夕方の振り返り */
    evening_reflection: 'lifecycle.evening_reflection',
  },

  // ── clip.* ────────────────────────────────────────────────────────────────
  /** 一時知識バッファ（クリップ）*/
  clip: {
    /** クリップ保存 */
    save:    'clip.save',
    /** VDB への昇格 */
    promote: 'clip.promote',
  },

  // ── feedback.* ────────────────────────────────────────────────────────────
  /** プラットフォームフィードバック */
  feedback: {
    /** フィードバック送信 */
    submit: 'feedback.submit',
    /** フィードバック一覧 */
    list:   'feedback.list',
  },

  // ── support.* ─────────────────────────────────────────────────────────────
  /** サポートチケット管理 */
  support: {
    /** サポートトリアージ */
    triage:     'support.triage',
    /** FAQ 検索 */
    faq_search: 'support.faq_search',
  },

  // ── crm.* ─────────────────────────────────────────────────────────────────
  /** CRM 商談パイプライン */
  crm: {
    /** 商談作成 */
    create_deal:     'crm.create_deal',
    /** 商談ステータス取得 */
    get_deal_status: 'crm.get_deal_status',
    /** 商談更新 */
    update_deal:     'crm.update_deal',
    /** リードスコアリング */
    score_lead:      'crm.score_lead',
    /** コンタクト検索 */
    search_contacts: 'crm.search_contacts',
    /** チケット作成 */
    create_ticket:   'crm.create_ticket',
    /** チケット更新 */
    update_ticket:   'crm.update_ticket',
  },

  // ── approval.* ────────────────────────────────────────────────────────────
  /** Human-in-the-loop 承認フロー */
  approval: {
    /** 承認リクエスト作成 */
    request: 'approval.request',
    /** 承認一覧取得 */
    list:    'approval.list',
    /** 承認 / 却下 応答 */
    respond: 'approval.respond',
  },

  // ── doc.* ─────────────────────────────────────────────────────────────────
  /** ドキュメント生成 */
  doc: {
    /** テンプレート穴埋め */
    fill_template:   'doc.fill_template',
    /** レポート生成 */
    generate_report: 'doc.generate_report',
  },

  // ── canvas.* ──────────────────────────────────────────────────────────────
  /** Command Canvas インタラクティブ UI 生成 */
  canvas: {
    /** Canvas 生成 */
    gen: 'canvas.gen',
  },

  // ── chat.* ────────────────────────────────────────────────────────────────
  /** チャット履歴永続化 */
  chat: {
    /** チャットメッセージ保存 */
    save:           'chat.save',
    /** チャットセッション一覧 */
    session_list:   'chat.session_list',
    /** チャットメッセージ一覧 */
    message_list:   'chat.message_list',
    /** チャットセッション検索 */
    session_search: 'chat.session_search',
    /** トークン使用量取得 */
    token_usage:    'chat.token_usage',
  },

  // ── media.* ───────────────────────────────────────────────────────────────
  /** メディア / ファイル操作 */
  media: {
    image_resize: 'media.image_resize',
    pdf_extract:  'media.pdf_extract',
    file_read:    'media.file_read',
    file_write:   'media.file_write',
    /** CSV パース（行列構造を JSON 配列に変換）*/
    csv_parse:    'media.csv_parse',
    /** CSV エクスポート（JSON 配列を CSV バイト列に変換）*/
    csv_export:   'media.csv_export',
    /** Word (.docx) テキスト抽出 */
    docx_parse:   'media.docx_parse',
  },

  // ── import.* ──────────────────────────────────────────────────────────────
  /** 構造化データ取込・パース */
  import: {
    csv_parse:  'import.csv_parse',
    json_parse: 'import.json_parse',
    html_parse: 'import.html_parse',
    rss_fetch:  'import.rss_fetch',
    /** フィールドマッピング自動推定（カラム名 → VDB スキーマ属性）*/
    auto_map:   'import.auto_map',
  },

  // ── workspace.* ───────────────────────────────────────────────────────────
  /** ワークスペーススコープデータアクセス */
  workspace: {
    member_list:    'workspace.member_list',
    project_get:    'workspace.project_get',
    tag_create:     'workspace.tag_create',
    intel_get_feed: 'workspace.intel_get_feed',
  },

  // ── builder.* ─────────────────────────────────────────────────────────────
  /** ビルダーエージェント / Human-in-the-loop フォーム */
  builder: {
    /** 承認リクエスト（HITL）*/
    approval_request: 'builder.approval_request',
    /** 承認結果取得（HITL）*/
    approval_result:  'builder.approval_result',
    /** フォーム送信（HITL）*/
    form_submit:      'builder.form_submit',
    /** App スキャフォールド生成 */
    scaffold_app:     'builder.scaffold_app',
    /** View 追加 */
    add_view:         'builder.add_view',
    /** エージェント設定 */
    configure_agent:  'builder.configure_agent',
    /** スキル割り当て */
    assign_skill:     'builder.assign_skill',
    /** ワークフロー作成 */
    create_workflow:  'builder.create_workflow',
    /** ステップ追加 */
    add_step:         'builder.add_step',
    /** トリガー設定 */
    set_trigger:      'builder.set_trigger',
    /** 定義バリデーション */
    validate:         'builder.validate',
    /** プレビュー */
    preview:          'builder.preview',
  },

  // ── orchestrator.* ────────────────────────────────────────────────────────
  /** マルチエージェント オーケストレーション */
  orchestrator: {
    /** プラン立案 */
    plan:                   'orchestrator.plan',
    /** エージェント委任 */
    delegate:               'orchestrator.delegate',
    /** 結果レビュー */
    review:                 'orchestrator.review',
    /** サマリー生成 */
    summarize:              'orchestrator.summarize',
    /** 承認待ち一覧取得 */
    get_pending_approvals:  'orchestrator.get_pending_approvals',
    /** WS サマリー */
    workspace_summary:      'orchestrator.workspace_summary',
    /** デイリーサマリー */
    daily_summary:          'orchestrator.daily_summary',
    /** マルチエージェントチームを編成して並列起動 */
    spawn_team:             'orchestrator.spawn_team',
    /** チーム全体の実行ステータスを取得 */
    team_status:            'orchestrator.team_status',
  },

  // ── connector.* ───────────────────────────────────────────────────────────
  /**
   * 外部 SaaS コネクター — 三段階キー `connector.{provider}.{verb}_{object}`
   *
   * 命名規則:
   *   connector.{provider}.{verb}_{object}
   *   例: connector.slack.send_message / connector.gcal.create_event
   *
   * この三段階構造により:
   *   - `connector.slack.*` で全 Slack ツールを列挙可能
   *   - エージェントスコープ制御を provider 単位で実施可能
   *   - OAuth スコープと provider の対応が構造から自明
   */
  connector: {
    // ── Slack ──────────────────────────────────────────────────────────────
    slack: {
      /** チャンネルへメッセージ送信 — scope: chat:write */
      send_message:  'connector.slack.send_message',
      /** ユーザーへ DM 送信 — scope: im:write */
      send_dm:       'connector.slack.send_dm',
      /** Block Kit 承認カード送信 — scope: chat:write */
      send_approval: 'connector.slack.send_approval',
      /** チャンネル/DM の履歴取得 — scope: channels:history */
      get_history:   'connector.slack.get_history',
      /** メッセージ・チャンネル検索 — scope: search:read */
      search:        'connector.slack.search',
      /** チャンネル一覧取得 — scope: channels:read */
      list_channels: 'connector.slack.list_channels',
      /** ユーザー一覧取得 — scope: users:read */
      list_users:    'connector.slack.list_users',
    },
    // ── Google Calendar ────────────────────────────────────────────────────
    gcal: {
      list_events:  'connector.gcal.list_events',
      create_event: 'connector.gcal.create_event',
      update_event: 'connector.gcal.update_event',
      delete_event: 'connector.gcal.delete_event',
      get_freebusy: 'connector.gcal.get_freebusy',
    },
    // ── Google Sheets ──────────────────────────────────────────────────────
    gsheets: {
      read:  'connector.gsheets.read',
      write: 'connector.gsheets.write',
    },
    // ── Google Drive ───────────────────────────────────────────────────────
    gdrive: {
      list_recent:  'connector.gdrive.list_recent',
      search:       'connector.gdrive.search',
      get_content:  'connector.gdrive.get_content',
      upload:       'connector.gdrive.upload',
      move_files:   'connector.gdrive.move_files',
    },
    // ── Google Docs ────────────────────────────────────────────────────────
    gdocs: {
      read:   'connector.gdocs.read',
      create: 'connector.gdocs.create',
    },
    // ── Google Slides ──────────────────────────────────────────────────────
    gslides: {
      read:   'connector.gslides.read',
      create: 'connector.gslides.create',
    },
    // ── Gmail ──────────────────────────────────────────────────────────────
    gmail: {
      read: 'connector.gmail.read',
      send: 'connector.gmail.send',
    },
    // ── Google Analytics 4 ────────────────────────────────────────────────
    ga4: {
      query: 'connector.ga4.query',
    },
    // ── Google Search Console ─────────────────────────────────────────────
    gsc: {
      query: 'connector.gsc.query',
    },
    // ── GitHub ────────────────────────────────────────────────────────────
    github: {
      create_issue: 'connector.github.create_issue',
      list_issues:  'connector.github.list_issues',
      create_pr:    'connector.github.create_pr',
      push:         'connector.github.push',
    },
    // ── Notion ────────────────────────────────────────────────────────────
    notion: {
      query:  'connector.notion.query',
      create: 'connector.notion.create',
      update: 'connector.notion.update',
    },
    // ── X (Twitter) ───────────────────────────────────────────────────────
    x: {
      post:   'connector.x.post',
      search: 'connector.x.search',
    },
    // ── Stripe ────────────────────────────────────────────────────────────
    stripe: {
      /** 支払い情報取得 — scope: payment_intents:read */
      payment_get:           'connector.stripe.payment_get',
      /** 請求書作成 — scope: invoices:write */
      invoice_create:        'connector.stripe.invoice_create',
      /** 請求書送付 — scope: invoices:write */
      invoice_send:          'connector.stripe.invoice_send',
      /** サブスクリプション作成 — scope: subscriptions:write */
      subscription_create:   'connector.stripe.subscription_create',
    },
    // ── カレンダードメイン抽象層（KEY:CONNECTOR-DOMAIN-ABSTRACTION）────────
    // OBP Type 3 継承: connector.* → connector.calendar.*（ドメイン語彙）
    // WF テンプレートはこの名前空間を使う。プロバイダー（gcal 等）は EF 内で解決。
    // ⚠️ connector.gcal.* / connector.outlook.* は brand name boundary — 将来はここで吸収
    calendar: {
      /** イベント一覧取得 → connector.gcal.list_events に委譲 */
      list_events:   'connector.calendar.list_events',
      /** イベント作成 → connector.gcal.create_event に委譲 */
      create_event:  'connector.calendar.create_event',
      /** イベント更新 → connector.gcal.update_event に委譲 */
      update_event:  'connector.calendar.update_event',
      /** イベント削除 → connector.gcal.delete_event に委譲 */
      delete_event:  'connector.calendar.delete_event',
      /** 空き時間取得 → connector.gcal.get_freebusy に委譲 */
      get_freebusy:  'connector.calendar.get_freebusy',
      /** 空きスロット提案（業務時間フィルタ付き） */
      propose_slots: 'connector.calendar.propose_slots',
    },
    // ── freee（brand name boundary）─────────────────────────────────────
    // connector.accounting.* で curated されていない freee API を直接呼ぶ脱出口。
    // OAuth トークンは EF が自動注入。path/method はエージェントが判断。
    // ⚠️ WF テンプレートは connector.accounting.* を優先。これはフォールバック。
    freee: {
      /** 任意の freee API エンドポイントを呼ぶ（OAuth トークン自動注入）*/
      api_call: 'connector.freee.api_call',
    },
    // ── 会計ドメイン抽象層（KEY:CONNECTOR-DOMAIN-ABSTRACTION）─────────────
    // OBP Type 3 継承: connector.* → connector.accounting.*（ドメイン語彙）
    // WF テンプレートはこの名前空間を使う。プロバイダー（freee 等）は EF 内で解決。
    // ⚠️ connector.freee.* は brand name boundary — ここには登録しない
    accounting: {
      /** 取引登録（収入/支出）→ freee POST /api/1/deals */
      transaction_create: 'connector.accounting.transaction_create',
      /** 振替伝票登録 → freee POST /api/1/manual_journals */
      journal_create:     'connector.accounting.journal_create',
      /** 勘定科目一覧取得 → freee GET /api/1/account_items */
      accounts_list:      'connector.accounting.accounts_list',
      /** 取引先一覧取得 → freee GET /api/1/partners */
      partners_list:      'connector.accounting.partners_list',
      /** 取引一覧取得（日付範囲・収支種別フィルタ）→ freee GET /api/1/deals */
      deals_list:         'connector.accounting.deals_list',
    },
  },

} as const

// ---------------------------------------------------------------------------
// Derived types
// ---------------------------------------------------------------------------

/** 全ツールキーのユニオン型 */
export type OBPToolKey = FlattenLeaves<typeof OBP_TOOL_KEYS>

/** カテゴリ名のユニオン型 */
export type OBPToolCategory = keyof typeof OBP_TOOL_KEYS

// カテゴリ別ナローイング型
export type OBPDataToolKey         = FlattenLeaves<typeof OBP_TOOL_KEYS.data>
export type OBPChangeToolKey       = FlattenLeaves<typeof OBP_TOOL_KEYS.change>
export type OBPProjectToolKey      = FlattenLeaves<typeof OBP_TOOL_KEYS.project>
export type OBPVappToolKey         = FlattenLeaves<typeof OBP_TOOL_KEYS.vapp>
export type OBPContextToolKey      = FlattenLeaves<typeof OBP_TOOL_KEYS.context>
export type OBPAiToolKey           = FlattenLeaves<typeof OBP_TOOL_KEYS.ai>
export type OBPNotifyToolKey       = FlattenLeaves<typeof OBP_TOOL_KEYS.notify>
export type OBPWebToolKey          = FlattenLeaves<typeof OBP_TOOL_KEYS.web>
export type OBPResearchToolKey     = FlattenLeaves<typeof OBP_TOOL_KEYS.research>
export type OBPIntelToolKey        = FlattenLeaves<typeof OBP_TOOL_KEYS.intel>
export type OBPSocialToolKey       = FlattenLeaves<typeof OBP_TOOL_KEYS.social>
export type OBPGrokToolKey         = FlattenLeaves<typeof OBP_TOOL_KEYS.grok>
export type OBPFlowToolKey         = FlattenLeaves<typeof OBP_TOOL_KEYS.flow>
export type OBPAgentToolKey        = FlattenLeaves<typeof OBP_TOOL_KEYS.agent>
export type OBPMemoryToolKey       = FlattenLeaves<typeof OBP_TOOL_KEYS.memory>
export type OBPLifecycleToolKey    = FlattenLeaves<typeof OBP_TOOL_KEYS.lifecycle>
export type OBPClipToolKey         = FlattenLeaves<typeof OBP_TOOL_KEYS.clip>
export type OBPFeedbackToolKey     = FlattenLeaves<typeof OBP_TOOL_KEYS.feedback>
export type OBPSupportToolKey      = FlattenLeaves<typeof OBP_TOOL_KEYS.support>
export type OBPCrmToolKey          = FlattenLeaves<typeof OBP_TOOL_KEYS.crm>
export type OBPApprovalToolKey     = FlattenLeaves<typeof OBP_TOOL_KEYS.approval>
export type OBPDocToolKey          = FlattenLeaves<typeof OBP_TOOL_KEYS.doc>
export type OBPCanvasToolKey       = FlattenLeaves<typeof OBP_TOOL_KEYS.canvas>
export type OBPChatToolKey         = FlattenLeaves<typeof OBP_TOOL_KEYS.chat>
export type OBPMediaToolKey        = FlattenLeaves<typeof OBP_TOOL_KEYS.media>
export type OBPImportToolKey       = FlattenLeaves<typeof OBP_TOOL_KEYS.import>
export type OBPWorkspaceToolKey    = FlattenLeaves<typeof OBP_TOOL_KEYS.workspace>
export type OBPBuilderToolKey      = FlattenLeaves<typeof OBP_TOOL_KEYS.builder>
export type OBPOrchestratorToolKey = FlattenLeaves<typeof OBP_TOOL_KEYS.orchestrator>
export type OBPConnectorToolKey    = FlattenLeaves<typeof OBP_TOOL_KEYS.connector>

// ---------------------------------------------------------------------------
// Tool metadata types
// ---------------------------------------------------------------------------

export type OBPToolExecution = 'sync' | 'async' | 'streaming'
export type OBPToolRisk      = 'safe' | 'low' | 'medium' | 'high'
export type OBPToolType      = 'rpc' | 'vdb_read' | 'vdb_write' | 'ai' | 'external' | 'flow' | 'agent'
export type OBPToolPhase     = 'ga' | 'beta' | 'planned'

export interface OBPToolMeta {
  label:           string
  category:        OBPToolCategory
  execution:       OBPToolExecution
  risk:            OBPToolRisk
  tool_type:       OBPToolType
  credits:         number
  phase:           OBPToolPhase
  /** OAuth スコープ要件（connector.* 専用）*/
  required_scopes?: string[]
  /**
   * OBP 哲学層の原型キー（実行時トレーサビリティ）
   * Type 2（OBP 原型継承）・Type 4（Root 具現）のキーに設定する。
   * OBP-MASTER-MAP §7.5 参照。
   * 例: 'being.configure' / 'being.execute' / 'being.reflect' / 'being.coordinate' / 'flow.delegate'
   */
  obp_prototype?: string
}

// ---------------------------------------------------------------------------
// Tool metadata registry
// ---------------------------------------------------------------------------

export const OBP_TOOL_META: Record<OBPToolKey, OBPToolMeta> = {
  // ── data ──────────────────────────────────────────────────────────────────
  'data.vdb_query':         { label: 'VDB Query',           category: 'data', execution: 'sync',  risk: 'safe',   tool_type: 'vdb_read',  credits: 1,  phase: 'ga'      },
  'data.vdb_insert':        { label: 'VDB Insert',           category: 'data', execution: 'sync',  risk: 'low',    tool_type: 'vdb_write', credits: 1,  phase: 'ga'      },
  'data.vdb_update':        { label: 'VDB Update',           category: 'data', execution: 'sync',  risk: 'low',    tool_type: 'vdb_write', credits: 1,  phase: 'ga'      },
  'data.vdb_delete':        { label: 'VDB Delete',           category: 'data', execution: 'sync',  risk: 'medium', tool_type: 'vdb_write', credits: 1,  phase: 'ga'      },
  'data.vdb_search':        { label: 'VDB Semantic Search',  category: 'data', execution: 'sync',  risk: 'safe',   tool_type: 'vdb_read',  credits: 2,  phase: 'ga'      },
  'data.vdb_list':          { label: 'VDB List',             category: 'data', execution: 'sync',  risk: 'safe',   tool_type: 'vdb_read',  credits: 1,  phase: 'ga'      },
  'data.vdb_upsert':        { label: 'VDB Upsert',           category: 'data', execution: 'sync',  risk: 'low',    tool_type: 'vdb_write', credits: 1,  phase: 'ga'      },
  'data.vdb_create_typed':  { label: 'VDB Create Typed',     category: 'data', execution: 'sync',  risk: 'low',    tool_type: 'vdb_write', credits: 2,  phase: 'ga'      },
  'data.vdb_link':          { label: 'VDB Link',             category: 'data', execution: 'sync',  risk: 'low',    tool_type: 'vdb_write', credits: 1,  phase: 'ga'      },
  'data.vdb_get_relations': { label: 'VDB Get Relations',    category: 'data', execution: 'sync',  risk: 'safe',   tool_type: 'vdb_read',  credits: 1,  phase: 'ga'      },
  'data.semantic_search':   { label: 'Semantic Search',      category: 'data', execution: 'sync',  risk: 'safe',   tool_type: 'vdb_read',  credits: 2,  phase: 'ga'      },
  'data.upsert':            { label: 'Data Upsert',          category: 'data', execution: 'sync',  risk: 'low',    tool_type: 'vdb_write', credits: 1,  phase: 'ga'      },
  'data.query':             { label: 'Data Query',           category: 'data', execution: 'sync',  risk: 'safe',   tool_type: 'vdb_read',  credits: 1,  phase: 'ga'      },
  'data.vsv_create':        { label: 'VSV Create',           category: 'data', execution: 'sync',  risk: 'low',    tool_type: 'vdb_write', credits: 2,  phase: 'planned' },
  'data.vsv_query':         { label: 'VSV Query',            category: 'data', execution: 'sync',  risk: 'safe',   tool_type: 'vdb_read',  credits: 1,  phase: 'planned' },
  'data.vsv_commit':        { label: 'VSV Commit',           category: 'data', execution: 'async', risk: 'low',    tool_type: 'vdb_write', credits: 2,  phase: 'planned' },

  // ── change ────────────────────────────────────────────────────────────────
  'change.create':          { label: '変更リクエスト作成', category: 'change', execution: 'sync', risk: 'medium', tool_type: 'rpc', credits: 1, phase: 'ga' },

  // ── project ───────────────────────────────────────────────────────────────
  'project.list':             { label: 'プロジェクト一覧',     category: 'project', execution: 'sync', risk: 'safe',   tool_type: 'rpc', credits: 0, phase: 'ga' },
  'project.issue_list':       { label: '課題一覧',             category: 'project', execution: 'sync', risk: 'safe',   tool_type: 'rpc', credits: 0, phase: 'ga' },
  'project.issue_create':     { label: '課題作成',             category: 'project', execution: 'sync', risk: 'low',    tool_type: 'rpc', credits: 1, phase: 'ga' },
  'project.issue_update':     { label: '課題更新',             category: 'project', execution: 'sync', risk: 'low',    tool_type: 'rpc', credits: 1, phase: 'ga' },
  'project.issue_delete':     { label: '課題削除',             category: 'project', execution: 'sync', risk: 'medium', tool_type: 'rpc', credits: 1, phase: 'ga' },
  'project.task_alerts_list': { label: 'タスクアラート一覧',   category: 'project', execution: 'sync', risk: 'safe',   tool_type: 'rpc', credits: 0, phase: 'ga' },
  'project.schedule_list':    { label: 'スケジュール一覧',     category: 'project', execution: 'sync', risk: 'safe',   tool_type: 'rpc', credits: 0, phase: 'ga' },
  'project.schedule_create':  { label: 'スケジュール作成',     category: 'project', execution: 'sync', risk: 'low',    tool_type: 'rpc', credits: 1, phase: 'ga' },
  'project.schedule_update':  { label: 'スケジュール更新',     category: 'project', execution: 'sync', risk: 'low',    tool_type: 'rpc', credits: 1, phase: 'ga' },
  'project.schedule_delete':  { label: 'スケジュール削除',     category: 'project', execution: 'sync', risk: 'medium', tool_type: 'rpc', credits: 1, phase: 'ga' },

  // ── vapp ──────────────────────────────────────────────────────────────────
  'vapp.analyze':       { label: 'VApp 分析',        category: 'vapp', execution: 'async', risk: 'safe', tool_type: 'ai', credits: 5,  phase: 'ga', obp_prototype: 'being.configure' },
  'vapp.generate':      { label: 'VApp 生成',        category: 'vapp', execution: 'async', risk: 'low',  tool_type: 'ai', credits: 10, phase: 'ga', obp_prototype: 'being.configure' },
  'vapp.modify':        { label: 'VApp 修正',        category: 'vapp', execution: 'async', risk: 'low',  tool_type: 'ai', credits: 5,  phase: 'ga', obp_prototype: 'being.configure' },
  'vapp.view_generate': { label: 'VApp View 生成',   category: 'vapp', execution: 'async', risk: 'low',  tool_type: 'ai', credits: 5,  phase: 'ga', obp_prototype: 'being.configure' },

  // ── context ───────────────────────────────────────────────────────────────
  'context.extract':  { label: 'Context Extract',  category: 'context', execution: 'sync', risk: 'safe', tool_type: 'rpc', credits: 2, phase: 'planned' },
  'context.compile':  { label: 'Context Compile',  category: 'context', execution: 'sync', risk: 'safe', tool_type: 'rpc', credits: 1, phase: 'ga'      },
  'context.feedback': { label: 'Context Feedback', category: 'context', execution: 'sync', risk: 'safe', tool_type: 'rpc', credits: 1, phase: 'planned' },

  // ── ai ────────────────────────────────────────────────────────────────────
  'ai.text_generate':    { label: 'Text Generate',    category: 'ai', execution: 'async',  risk: 'safe', tool_type: 'ai', credits: 10, phase: 'ga'   },
  'ai.text_summary':     { label: 'Text Summary',     category: 'ai', execution: 'async',  risk: 'safe', tool_type: 'ai', credits: 5,  phase: 'ga'   },
  'ai.text_classify':    { label: 'Text Classify',    category: 'ai', execution: 'sync',   risk: 'safe', tool_type: 'ai', credits: 3,  phase: 'ga'   },
  'ai.text_extract':     { label: 'Text Extract',     category: 'ai', execution: 'sync',   risk: 'safe', tool_type: 'ai', credits: 3,  phase: 'ga'   },
  'ai.text_translate':   { label: 'Text Translate',   category: 'ai', execution: 'sync',   risk: 'safe', tool_type: 'ai', credits: 3,  phase: 'ga'   },
  'ai.image_generate':   { label: 'Image Generate',   category: 'ai', execution: 'async',  risk: 'low',  tool_type: 'ai', credits: 20, phase: 'beta' },
  'ai.image_analyze':    { label: 'Image Analyze',    category: 'ai', execution: 'sync',   risk: 'safe', tool_type: 'ai', credits: 5,  phase: 'beta' },
  'ai.audio_transcribe': { label: 'Audio Transcribe', category: 'ai', execution: 'async',  risk: 'safe', tool_type: 'ai', credits: 10, phase: 'beta' },
  'ai.embedding_create': { label: 'Embedding Create', category: 'ai', execution: 'sync',   risk: 'safe', tool_type: 'ai', credits: 1,  phase: 'ga'   },
  'ai.classify':         { label: '分類',              category: 'ai', execution: 'sync',   risk: 'safe', tool_type: 'ai', credits: 3,  phase: 'ga'   },
  'ai.extract':          { label: '構造抽出',           category: 'ai', execution: 'sync',   risk: 'safe', tool_type: 'ai', credits: 3,  phase: 'ga'   },

  // ── notify ────────────────────────────────────────────────────────────────
  'notify.slack':   { label: 'Slack Notify',  category: 'notify', execution: 'sync',  risk: 'medium', tool_type: 'external', credits: 1, phase: 'ga' },
  'notify.email':   { label: 'Email Notify',  category: 'notify', execution: 'async', risk: 'medium', tool_type: 'external', credits: 2, phase: 'ga' },
  'notify.webhook': { label: 'Webhook Send',  category: 'notify', execution: 'sync',  risk: 'medium', tool_type: 'external', credits: 1, phase: 'ga' },
  'notify.in_app':  { label: 'In-App Notify', category: 'notify', execution: 'sync',  risk: 'safe',   tool_type: 'rpc',      credits: 0, phase: 'ga' },

  // ── web ───────────────────────────────────────────────────────────────────
  'web.search': { label: 'Web Search', category: 'web', execution: 'async', risk: 'safe', tool_type: 'external', credits: 3, phase: 'ga' },
  'web.fetch':  { label: 'Web Fetch',  category: 'web', execution: 'async', risk: 'safe', tool_type: 'external', credits: 1, phase: 'ga' },
  'web.scrape': { label: 'Web Scrape', category: 'web', execution: 'async', risk: 'low',  tool_type: 'external', credits: 3, phase: 'ga' },

  // ── research ──────────────────────────────────────────────────────────────
  'research.web_fetch':    { label: 'Web Fetch（調査）',  category: 'research', execution: 'async', risk: 'safe', tool_type: 'external', credits: 1, phase: 'ga' },
  'research.web_search':   { label: 'Web 検索（調査）',  category: 'research', execution: 'async', risk: 'safe', tool_type: 'external', credits: 3, phase: 'ga' },
  'research.diff_content': { label: 'コンテンツ差分検出', category: 'research', execution: 'sync',  risk: 'safe', tool_type: 'rpc',      credits: 1, phase: 'ga' },
  'research.monitor_url':  { label: 'URL 監視登録',       category: 'research', execution: 'async', risk: 'low',  tool_type: 'rpc',      credits: 2, phase: 'ga' },

  // ── intel ─────────────────────────────────────────────────────────────────
  'intel.get_feed':         { label: 'インテリジェンスフィード取得', category: 'intel', execution: 'sync',  risk: 'safe', tool_type: 'rpc', credits: 0, phase: 'ga' },
  'intel.mark_read':        { label: 'フィード既読',                category: 'intel', execution: 'sync',  risk: 'safe', tool_type: 'rpc', credits: 0, phase: 'ga' },
  'intel.pin':              { label: 'フィードピン',                category: 'intel', execution: 'sync',  risk: 'safe', tool_type: 'rpc', credits: 0, phase: 'ga' },
  'intel.collect':          { label: 'インテリジェンス収集',         category: 'intel', execution: 'async', risk: 'safe', tool_type: 'external', credits: 5, phase: 'ga' },
  'intel.fanout':           { label: '収集結果ファンアウト',          category: 'intel', execution: 'async', risk: 'safe', tool_type: 'rpc',      credits: 1, phase: 'ga' },
  'intel.fetch_full_texts': { label: '全文取得',                    category: 'intel', execution: 'async', risk: 'safe', tool_type: 'external', credits: 2, phase: 'ga' },

  // ── social ────────────────────────────────────────────────────────────────
  'social.twitter_post':   { label: 'Twitter/X Post',    category: 'social', execution: 'sync',  risk: 'high',  tool_type: 'external', credits: 3, phase: 'ga'      },
  'social.twitter_search': { label: 'Twitter/X Search',  category: 'social', execution: 'sync',  risk: 'safe',  tool_type: 'external', credits: 2, phase: 'ga'      },
  'social.instagram_post': { label: 'Instagram Post',    category: 'social', execution: 'sync',  risk: 'high',  tool_type: 'external', credits: 3, phase: 'planned' },
  'social.linkedin_post':  { label: 'LinkedIn Post',     category: 'social', execution: 'sync',  risk: 'high',  tool_type: 'external', credits: 3, phase: 'planned' },
  'social.curate':         { label: 'ソーシャルキュレーション', category: 'social', execution: 'async', risk: 'safe', tool_type: 'external', credits: 5, phase: 'ga' },

  // ── grok ──────────────────────────────────────────────────────────────────
  'grok.live_search': { label: 'Grok ライブ検索', category: 'grok', execution: 'async', risk: 'safe', tool_type: 'external', credits: 3, phase: 'ga' },

  // ── flow ──────────────────────────────────────────────────────────────────
  'flow.conditional': { label: 'Conditional', category: 'flow', execution: 'sync',  risk: 'safe', tool_type: 'flow', credits: 0, phase: 'ga' },
  'flow.loop':        { label: 'Loop',         category: 'flow', execution: 'sync',  risk: 'safe', tool_type: 'flow', credits: 0, phase: 'ga' },
  'flow.parallel':    { label: 'Parallel',     category: 'flow', execution: 'async', risk: 'safe', tool_type: 'flow', credits: 0, phase: 'ga' },
  'flow.wait':        { label: 'Wait',         category: 'flow', execution: 'async', risk: 'safe', tool_type: 'flow', credits: 0, phase: 'ga' },
  'flow.transform':   { label: 'Transform',    category: 'flow', execution: 'sync',  risk: 'safe', tool_type: 'flow', credits: 0, phase: 'ga' },
  'flow.merge':       { label: 'Merge',        category: 'flow', execution: 'sync',  risk: 'safe', tool_type: 'flow', credits: 0, phase: 'ga' },
  'flow.delegate':    { label: 'Delegate',     category: 'flow', execution: 'async', risk: 'safe', tool_type: 'flow', credits: 0, phase: 'ga', obp_prototype: 'flow.delegate' },

  // ── agent ─────────────────────────────────────────────────────────────────
  'agent.call_skill':    { label: 'Call Skill',    category: 'agent', execution: 'async', risk: 'safe',   tool_type: 'agent', credits: 5,  phase: 'ga',   obp_prototype: 'being.execute'   },
  'agent.handoff':       { label: 'Handoff',       category: 'agent', execution: 'async', risk: 'low',    tool_type: 'agent', credits: 2,  phase: 'ga',   obp_prototype: 'being.coordinate' },
  'agent.spawn':         { label: 'Spawn Agent',   category: 'agent', execution: 'async', risk: 'medium', tool_type: 'agent', credits: 10, phase: 'beta', obp_prototype: 'being.coordinate' },
  'agent.recall':        { label: 'Recall',        category: 'agent', execution: 'sync',  risk: 'safe',   tool_type: 'agent', credits: 1,  phase: 'ga',   obp_prototype: 'being.reflect'   },
  'agent.retrospective': { label: '自己振り返り',   category: 'agent', execution: 'async', risk: 'safe',   tool_type: 'agent', credits: 5,  phase: 'ga',   obp_prototype: 'being.reflect'   },
  'agent.self_report':   { label: '自律性レポート', category: 'agent', execution: 'sync',  risk: 'safe',   tool_type: 'rpc',   credits: 0,  phase: 'ga'   },

  // ── memory ────────────────────────────────────────────────────────────────
  'memory.save':   { label: 'Memory Save',   category: 'memory', execution: 'sync', risk: 'safe', tool_type: 'vdb_write', credits: 1, phase: 'ga', obp_prototype: 'being.reflect' },
  'memory.load':   { label: 'Memory Load',   category: 'memory', execution: 'sync', risk: 'safe', tool_type: 'vdb_read',  credits: 1, phase: 'ga', obp_prototype: 'being.reflect' },
  'memory.search': { label: 'Memory Search', category: 'memory', execution: 'sync', risk: 'safe', tool_type: 'vdb_read',  credits: 2, phase: 'ga', obp_prototype: 'being.reflect' },
  'memory.clear':  { label: 'Memory Clear',  category: 'memory', execution: 'sync', risk: 'low',  tool_type: 'vdb_write', credits: 1, phase: 'ga', obp_prototype: 'being.reflect' },

  // ── lifecycle ─────────────────────────────────────────────────────────────
  'lifecycle.morning_briefing':   { label: '朝のブリーフィング', category: 'lifecycle', execution: 'async', risk: 'safe', tool_type: 'agent', credits: 5, phase: 'ga', obp_prototype: 'being.coordinate' },
  'lifecycle.evening_reflection': { label: '夕方の振り返り',     category: 'lifecycle', execution: 'async', risk: 'safe', tool_type: 'agent', credits: 5, phase: 'ga', obp_prototype: 'being.coordinate' },

  // ── clip ──────────────────────────────────────────────────────────────────
  'clip.save':    { label: 'クリップ保存',  category: 'clip', execution: 'sync',  risk: 'low',  tool_type: 'vdb_write', credits: 1, phase: 'ga' },
  'clip.promote': { label: 'VDB へ昇格',   category: 'clip', execution: 'async', risk: 'low',  tool_type: 'vdb_write', credits: 2, phase: 'ga' },

  // ── feedback ──────────────────────────────────────────────────────────────
  'feedback.submit': { label: 'フィードバック送信', category: 'feedback', execution: 'sync', risk: 'safe', tool_type: 'rpc', credits: 0, phase: 'ga' },
  'feedback.list':   { label: 'フィードバック一覧', category: 'feedback', execution: 'sync', risk: 'safe', tool_type: 'rpc', credits: 0, phase: 'ga' },

  // ── support ───────────────────────────────────────────────────────────────
  'support.triage':     { label: 'サポートトリアージ', category: 'support', execution: 'async', risk: 'safe', tool_type: 'ai',  credits: 5, phase: 'ga' },
  'support.faq_search': { label: 'FAQ 検索',           category: 'support', execution: 'sync',  risk: 'safe', tool_type: 'rpc', credits: 0, phase: 'ga' },

  // ── crm ───────────────────────────────────────────────────────────────────
  'crm.create_deal':     { label: '商談作成',         category: 'crm', execution: 'sync', risk: 'low',    tool_type: 'rpc', credits: 1, phase: 'ga' },
  'crm.get_deal_status': { label: '商談ステータス取得', category: 'crm', execution: 'sync', risk: 'safe',   tool_type: 'rpc', credits: 0, phase: 'ga' },
  'crm.update_deal':     { label: '商談更新',         category: 'crm', execution: 'sync', risk: 'low',    tool_type: 'rpc', credits: 1, phase: 'ga' },
  'crm.score_lead':      { label: 'リードスコアリング', category: 'crm', execution: 'sync', risk: 'safe',   tool_type: 'ai',  credits: 3, phase: 'ga' },
  'crm.search_contacts': { label: 'コンタクト検索',   category: 'crm', execution: 'sync', risk: 'safe',   tool_type: 'rpc', credits: 0, phase: 'ga' },
  'crm.create_ticket':   { label: 'チケット作成',     category: 'crm', execution: 'sync', risk: 'low',    tool_type: 'rpc', credits: 1, phase: 'ga' },
  'crm.update_ticket':   { label: 'チケット更新',     category: 'crm', execution: 'sync', risk: 'low',    tool_type: 'rpc', credits: 1, phase: 'ga' },

  // ── approval ──────────────────────────────────────────────────────────────
  'approval.request': { label: '承認リクエスト作成', category: 'approval', execution: 'async', risk: 'medium', tool_type: 'rpc', credits: 1, phase: 'ga' },
  'approval.list':    { label: '承認一覧取得',       category: 'approval', execution: 'sync',  risk: 'safe',   tool_type: 'rpc', credits: 0, phase: 'ga' },
  'approval.respond': { label: '承認応答',           category: 'approval', execution: 'sync',  risk: 'medium', tool_type: 'rpc', credits: 1, phase: 'ga' },

  // ── doc ───────────────────────────────────────────────────────────────────
  'doc.fill_template':   { label: 'テンプレート穴埋め', category: 'doc', execution: 'async', risk: 'low',  tool_type: 'ai', credits: 5, phase: 'ga' },
  'doc.generate_report': { label: 'レポート生成',       category: 'doc', execution: 'async', risk: 'low',  tool_type: 'ai', credits: 10, phase: 'ga' },

  // ── canvas ────────────────────────────────────────────────────────────────
  'canvas.gen': { label: 'Canvas 生成', category: 'canvas', execution: 'async', risk: 'safe', tool_type: 'ai', credits: 5, phase: 'ga' },

  // ── chat ──────────────────────────────────────────────────────────────────
  'chat.save':           { label: 'チャット保存',         category: 'chat', execution: 'sync', risk: 'safe', tool_type: 'rpc', credits: 0, phase: 'ga' },
  'chat.session_list':   { label: 'チャットセッション一覧', category: 'chat', execution: 'sync', risk: 'safe', tool_type: 'rpc', credits: 0, phase: 'ga' },
  'chat.message_list':   { label: 'チャットメッセージ一覧', category: 'chat', execution: 'sync', risk: 'safe', tool_type: 'rpc', credits: 0, phase: 'ga' },
  'chat.session_search': { label: 'チャットセッション検索', category: 'chat', execution: 'sync', risk: 'safe', tool_type: 'rpc', credits: 0, phase: 'ga' },
  'chat.token_usage':    { label: 'トークン使用量',         category: 'chat', execution: 'sync', risk: 'safe', tool_type: 'rpc', credits: 0, phase: 'ga' },

  // ── media ─────────────────────────────────────────────────────────────────
  'media.image_resize': { label: 'Image Resize', category: 'media', execution: 'sync',  risk: 'safe', tool_type: 'rpc', credits: 1, phase: 'planned' },
  'media.pdf_extract':  { label: 'PDF Extract',  category: 'media', execution: 'async', risk: 'safe', tool_type: 'rpc', credits: 3, phase: 'planned' },
  'media.file_read':    { label: 'File Read',    category: 'media', execution: 'sync',  risk: 'safe', tool_type: 'rpc', credits: 1, phase: 'planned' },
  'media.file_write':   { label: 'File Write',   category: 'media', execution: 'sync',  risk: 'low',  tool_type: 'rpc', credits: 1, phase: 'planned' },

  // ── import ────────────────────────────────────────────────────────────────
  'import.csv_parse':  { label: 'CSV Parse',  category: 'import', execution: 'sync',  risk: 'safe', tool_type: 'rpc',      credits: 1, phase: 'ga' },
  'import.json_parse': { label: 'JSON Parse', category: 'import', execution: 'sync',  risk: 'safe', tool_type: 'rpc',      credits: 1, phase: 'ga' },
  'import.html_parse': { label: 'HTML Parse', category: 'import', execution: 'sync',  risk: 'safe', tool_type: 'rpc',      credits: 1, phase: 'ga' },
  'import.rss_fetch':  { label: 'RSS Fetch',  category: 'import', execution: 'async', risk: 'safe', tool_type: 'external', credits: 2, phase: 'ga' },

  // ── workspace ─────────────────────────────────────────────────────────────
  'workspace.member_list':    { label: 'Member List',    category: 'workspace', execution: 'sync', risk: 'safe', tool_type: 'rpc', credits: 0, phase: 'ga' },
  'workspace.project_get':    { label: 'Project Get',    category: 'workspace', execution: 'sync', risk: 'safe', tool_type: 'rpc', credits: 0, phase: 'ga' },
  'workspace.tag_create':     { label: 'Tag Create',     category: 'workspace', execution: 'sync', risk: 'low',  tool_type: 'rpc', credits: 0, phase: 'ga' },
  'workspace.intel_get_feed': { label: 'Intel Feed Get', category: 'workspace', execution: 'sync', risk: 'safe', tool_type: 'rpc', credits: 0, phase: 'ga' },

  // ── builder ───────────────────────────────────────────────────────────────
  'builder.approval_request': { label: 'Approval Request',  category: 'builder', execution: 'async', risk: 'safe', tool_type: 'rpc', credits: 0, phase: 'ga' },
  'builder.approval_result':  { label: 'Approval Result',   category: 'builder', execution: 'sync',  risk: 'safe', tool_type: 'rpc', credits: 0, phase: 'ga' },
  'builder.form_submit':      { label: 'Form Submit',        category: 'builder', execution: 'sync',  risk: 'low',  tool_type: 'rpc', credits: 0, phase: 'ga' },
  'builder.scaffold_app':     { label: 'App スキャフォールド', category: 'builder', execution: 'async', risk: 'low',  tool_type: 'ai',  credits: 10, phase: 'ga', obp_prototype: 'being.configure' },
  'builder.add_view':         { label: 'View 追加',           category: 'builder', execution: 'async', risk: 'low',  tool_type: 'ai',  credits: 5,  phase: 'ga', obp_prototype: 'being.configure' },
  'builder.configure_agent':  { label: 'エージェント設定',     category: 'builder', execution: 'sync',  risk: 'low',  tool_type: 'rpc', credits: 1,  phase: 'ga', obp_prototype: 'being.configure' },
  'builder.assign_skill':     { label: 'スキル割り当て',       category: 'builder', execution: 'sync',  risk: 'low',  tool_type: 'rpc', credits: 1,  phase: 'ga', obp_prototype: 'being.configure' },
  'builder.create_workflow':  { label: 'ワークフロー作成',     category: 'builder', execution: 'async', risk: 'low',  tool_type: 'ai',  credits: 5,  phase: 'ga', obp_prototype: 'being.configure' },
  'builder.add_step':         { label: 'ステップ追加',         category: 'builder', execution: 'sync',  risk: 'low',  tool_type: 'rpc', credits: 1,  phase: 'ga', obp_prototype: 'being.configure' },
  'builder.set_trigger':      { label: 'トリガー設定',         category: 'builder', execution: 'sync',  risk: 'low',  tool_type: 'rpc', credits: 1,  phase: 'ga', obp_prototype: 'being.configure' },
  'builder.validate':         { label: 'バリデーション',       category: 'builder', execution: 'sync',  risk: 'safe', tool_type: 'rpc', credits: 0,  phase: 'ga' },
  'builder.preview':          { label: 'プレビュー',           category: 'builder', execution: 'sync',  risk: 'safe', tool_type: 'rpc', credits: 0,  phase: 'ga' },

  // ── orchestrator ──────────────────────────────────────────────────────────
  'orchestrator.plan':                  { label: 'Plan',              category: 'orchestrator', execution: 'async', risk: 'safe', tool_type: 'agent', credits: 10, phase: 'beta', obp_prototype: 'being.coordinate' },
  'orchestrator.delegate':              { label: 'Delegate',          category: 'orchestrator', execution: 'async', risk: 'low',  tool_type: 'agent', credits: 5,  phase: 'beta', obp_prototype: 'being.coordinate' },
  'orchestrator.review':                { label: 'Review',            category: 'orchestrator', execution: 'async', risk: 'safe', tool_type: 'agent', credits: 5,  phase: 'beta', obp_prototype: 'being.coordinate' },
  'orchestrator.summarize':             { label: 'Summarize',         category: 'orchestrator', execution: 'async', risk: 'safe', tool_type: 'agent', credits: 5,  phase: 'beta', obp_prototype: 'being.coordinate' },
  'orchestrator.get_pending_approvals': { label: '承認待ち一覧',      category: 'orchestrator', execution: 'sync',  risk: 'safe', tool_type: 'rpc',   credits: 0,  phase: 'ga'   },
  'orchestrator.workspace_summary':     { label: 'WS サマリー',       category: 'orchestrator', execution: 'async', risk: 'safe', tool_type: 'agent', credits: 5,  phase: 'ga',   obp_prototype: 'being.coordinate' },
  'orchestrator.daily_summary':         { label: 'デイリーサマリー',   category: 'orchestrator', execution: 'async', risk: 'safe', tool_type: 'agent', credits: 5,  phase: 'ga'   },

  // ── connector.slack ───────────────────────────────────────────────────────
  'connector.slack.send_message':  { label: 'Slack: チャンネル送信',  category: 'connector', execution: 'sync',  risk: 'medium', tool_type: 'external', credits: 1, phase: 'ga',      required_scopes: ['chat:write']       },
  'connector.slack.send_dm':       { label: 'Slack: DM 送信',        category: 'connector', execution: 'sync',  risk: 'medium', tool_type: 'external', credits: 1, phase: 'planned', required_scopes: ['im:write']          },
  'connector.slack.send_approval': { label: 'Slack: 承認カード送信',  category: 'connector', execution: 'async', risk: 'medium', tool_type: 'external', credits: 2, phase: 'ga',      required_scopes: ['chat:write']       },
  'connector.slack.get_history':   { label: 'Slack: 履歴取得',       category: 'connector', execution: 'sync',  risk: 'safe',   tool_type: 'external', credits: 1, phase: 'ga',      required_scopes: ['channels:history'] },
  'connector.slack.search':        { label: 'Slack: 検索',           category: 'connector', execution: 'sync',  risk: 'safe',   tool_type: 'external', credits: 1, phase: 'planned', required_scopes: ['search:read']      },
  'connector.slack.list_channels': { label: 'Slack: チャンネル一覧',  category: 'connector', execution: 'sync',  risk: 'safe',   tool_type: 'external', credits: 1, phase: 'planned', required_scopes: ['channels:read']    },
  'connector.slack.list_users':    { label: 'Slack: ユーザー一覧',    category: 'connector', execution: 'sync',  risk: 'safe',   tool_type: 'external', credits: 1, phase: 'planned', required_scopes: ['users:read']       },
  // ── connector.gcal ────────────────────────────────────────────────────────
  'connector.gcal.list_events':    { label: 'GCal: イベント一覧',     category: 'connector', execution: 'sync',  risk: 'safe',   tool_type: 'external', credits: 1, phase: 'ga', required_scopes: ['https://www.googleapis.com/auth/calendar.events.readonly'] },
  'connector.gcal.create_event':   { label: 'GCal: イベント作成',     category: 'connector', execution: 'sync',  risk: 'low',    tool_type: 'external', credits: 2, phase: 'ga', required_scopes: ['https://www.googleapis.com/auth/calendar.events']          },
  'connector.gcal.update_event':   { label: 'GCal: イベント更新',     category: 'connector', execution: 'sync',  risk: 'low',    tool_type: 'external', credits: 2, phase: 'ga', required_scopes: ['https://www.googleapis.com/auth/calendar.events']          },
  'connector.gcal.delete_event':   { label: 'GCal: イベント削除',     category: 'connector', execution: 'sync',  risk: 'medium', tool_type: 'external', credits: 2, phase: 'ga', required_scopes: ['https://www.googleapis.com/auth/calendar.events']          },
  'connector.gcal.get_freebusy':   { label: 'GCal: 空き時間取得',     category: 'connector', execution: 'sync',  risk: 'safe',   tool_type: 'external', credits: 1, phase: 'ga', required_scopes: ['https://www.googleapis.com/auth/calendar.freebusy']        },
  // ── connector.gsheets ─────────────────────────────────────────────────────
  'connector.gsheets.read':        { label: 'Sheets: 読み取り',        category: 'connector', execution: 'sync',  risk: 'safe',   tool_type: 'external', credits: 1, phase: 'planned', required_scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] },
  'connector.gsheets.write':       { label: 'Sheets: 書き込み',        category: 'connector', execution: 'sync',  risk: 'low',    tool_type: 'external', credits: 2, phase: 'planned', required_scopes: ['https://www.googleapis.com/auth/spreadsheets']          },
  // ── connector.gdrive ──────────────────────────────────────────────────────
  'connector.gdrive.list_recent':  { label: 'Drive: 最近のファイル',   category: 'connector', execution: 'sync',  risk: 'safe',   tool_type: 'external', credits: 1, phase: 'ga', required_scopes: ['https://www.googleapis.com/auth/drive.file'] },
  'connector.gdrive.search':       { label: 'Drive: ファイル検索',     category: 'connector', execution: 'sync',  risk: 'safe',   tool_type: 'external', credits: 1, phase: 'ga', required_scopes: ['https://www.googleapis.com/auth/drive.file'] },
  'connector.gdrive.get_content':  { label: 'Drive: コンテンツ取得',   category: 'connector', execution: 'sync',  risk: 'safe',   tool_type: 'external', credits: 2, phase: 'ga', required_scopes: ['https://www.googleapis.com/auth/drive.file'] },
  'connector.gdrive.upload':       { label: 'Drive: アップロード',     category: 'connector', execution: 'sync',  risk: 'low',    tool_type: 'external', credits: 2, phase: 'ga', required_scopes: ['https://www.googleapis.com/auth/drive.file'] },
  'connector.gdrive.move_files':   { label: 'Drive: ファイル移動',     category: 'connector', execution: 'sync',  risk: 'low',    tool_type: 'external', credits: 2, phase: 'ga', required_scopes: ['https://www.googleapis.com/auth/drive.file'] },
  // ── connector.gdocs ───────────────────────────────────────────────────────
  'connector.gdocs.read':           { label: 'Docs: 読み取り',          category: 'connector', execution: 'sync',  risk: 'safe',   tool_type: 'external', credits: 1, phase: 'planned', required_scopes: ['https://www.googleapis.com/auth/documents.readonly'] },
  'connector.gdocs.create':         { label: 'Docs: 作成',             category: 'connector', execution: 'sync',  risk: 'low',    tool_type: 'external', credits: 2, phase: 'planned', required_scopes: ['https://www.googleapis.com/auth/documents']          },
  // ── connector.gslides ─────────────────────────────────────────────────────
  'connector.gslides.read':         { label: 'Slides: 読み取り',        category: 'connector', execution: 'sync',  risk: 'safe',   tool_type: 'external', credits: 1, phase: 'planned', required_scopes: ['https://www.googleapis.com/auth/presentations.readonly'] },
  'connector.gslides.create':       { label: 'Slides: 作成',           category: 'connector', execution: 'sync',  risk: 'low',    tool_type: 'external', credits: 2, phase: 'planned', required_scopes: ['https://www.googleapis.com/auth/presentations']          },
  // ── connector.gmail ───────────────────────────────────────────────────────
  'connector.gmail.read':           { label: 'Gmail: 読み取り',         category: 'connector', execution: 'sync',  risk: 'safe',   tool_type: 'external', credits: 1, phase: 'planned', required_scopes: ['https://www.googleapis.com/auth/gmail.readonly'] },
  'connector.gmail.send':           { label: 'Gmail: 送信',            category: 'connector', execution: 'sync',  risk: 'high',   tool_type: 'external', credits: 2, phase: 'planned', required_scopes: ['https://www.googleapis.com/auth/gmail.send']    },
  // ── connector.ga4 ─────────────────────────────────────────────────────────
  'connector.ga4.query':            { label: 'GA4: データ取得',          category: 'connector', execution: 'sync',  risk: 'safe',   tool_type: 'external', credits: 2, phase: 'planned', required_scopes: ['https://www.googleapis.com/auth/analytics.readonly']  },
  // ── connector.gsc ─────────────────────────────────────────────────────────
  'connector.gsc.query':            { label: 'GSC: データ取得',          category: 'connector', execution: 'sync',  risk: 'safe',   tool_type: 'external', credits: 2, phase: 'planned', required_scopes: ['https://www.googleapis.com/auth/webmasters.readonly'] },
  // ── connector.github ──────────────────────────────────────────────────────
  'connector.github.create_issue':  { label: 'GitHub: イシュー作成',    category: 'connector', execution: 'sync',  risk: 'low',    tool_type: 'external', credits: 2, phase: 'planned', required_scopes: ['issues'] },
  'connector.github.list_issues':   { label: 'GitHub: イシュー一覧',    category: 'connector', execution: 'sync',  risk: 'safe',   tool_type: 'external', credits: 1, phase: 'planned', required_scopes: ['read:user'] },
  'connector.github.create_pr':     { label: 'GitHub: PR 作成',        category: 'connector', execution: 'sync',  risk: 'low',    tool_type: 'external', credits: 2, phase: 'planned', required_scopes: ['repo'] },
  'connector.github.push':          { label: 'GitHub: Push',           category: 'connector', execution: 'sync',  risk: 'high',   tool_type: 'external', credits: 3, phase: 'planned', required_scopes: ['repo'] },
  // ── connector.notion ──────────────────────────────────────────────────────
  'connector.notion.query':         { label: 'Notion: クエリ',          category: 'connector', execution: 'sync',  risk: 'safe',   tool_type: 'external', credits: 1, phase: 'planned', required_scopes: ['read_content'] },
  'connector.notion.create':        { label: 'Notion: ページ作成',      category: 'connector', execution: 'sync',  risk: 'low',    tool_type: 'external', credits: 2, phase: 'planned', required_scopes: ['read_content', 'insert_content'] },
  'connector.notion.update':        { label: 'Notion: ページ更新',      category: 'connector', execution: 'sync',  risk: 'low',    tool_type: 'external', credits: 2, phase: 'planned', required_scopes: ['read_content', 'update_content'] },
  // ── connector.x ───────────────────────────────────────────────────────────
  'connector.x.post':               { label: 'X: 投稿',                category: 'connector', execution: 'sync',  risk: 'high',   tool_type: 'external', credits: 3, phase: 'planned' },
  'connector.x.search':             { label: 'X: 検索',                category: 'connector', execution: 'sync',  risk: 'safe',   tool_type: 'external', credits: 2, phase: 'planned' },
  // ── connector.stripe ──────────────────────────────────────────────────────
  'connector.stripe.payment_get':         { label: 'Stripe: 支払い取得',          category: 'connector', execution: 'sync',  risk: 'safe',   tool_type: 'external', credits: 1, phase: 'planned', required_scopes: ['payment_intents:read']   },
  'connector.stripe.invoice_create':      { label: 'Stripe: 請求書作成',          category: 'connector', execution: 'sync',  risk: 'medium', tool_type: 'external', credits: 2, phase: 'planned', required_scopes: ['invoices:write']          },
  'connector.stripe.invoice_send':        { label: 'Stripe: 請求書送付',          category: 'connector', execution: 'sync',  risk: 'high',   tool_type: 'external', credits: 2, phase: 'planned', required_scopes: ['invoices:write']          },
  'connector.stripe.subscription_create': { label: 'Stripe: サブスクリプション作成', category: 'connector', execution: 'sync',  risk: 'high',   tool_type: 'external', credits: 3, phase: 'planned', required_scopes: ['subscriptions:write']     },
  // ── connector.calendar — カレンダードメイン抽象層（KEY:CONNECTOR-DOMAIN-ABSTRACTION）──
  // connector.gcal.* への委譲ルーター。将来 Outlook 等が追加されてもここは変更なし。
  'connector.calendar.list_events':  { label: 'Calendar: イベント一覧',   category: 'connector', execution: 'sync',  risk: 'safe',   tool_type: 'external', credits: 1, phase: 'ga', required_scopes: ['https://www.googleapis.com/auth/calendar.events.readonly'] },
  'connector.calendar.create_event': { label: 'Calendar: イベント作成',   category: 'connector', execution: 'sync',  risk: 'low',    tool_type: 'external', credits: 2, phase: 'ga', required_scopes: ['https://www.googleapis.com/auth/calendar.events']          },
  'connector.calendar.update_event': { label: 'Calendar: イベント更新',   category: 'connector', execution: 'sync',  risk: 'low',    tool_type: 'external', credits: 2, phase: 'ga', required_scopes: ['https://www.googleapis.com/auth/calendar.events']          },
  'connector.calendar.delete_event': { label: 'Calendar: イベント削除',   category: 'connector', execution: 'sync',  risk: 'medium', tool_type: 'external', credits: 2, phase: 'ga', required_scopes: ['https://www.googleapis.com/auth/calendar.events']          },
  'connector.calendar.get_freebusy': { label: 'Calendar: 空き時間取得',   category: 'connector', execution: 'sync',  risk: 'safe',   tool_type: 'external', credits: 1, phase: 'ga', required_scopes: ['https://www.googleapis.com/auth/calendar.freebusy']        },
  'connector.calendar.propose_slots': { label: 'Calendar: スロット提案',  category: 'connector', execution: 'sync',  risk: 'safe',   tool_type: 'external', credits: 3, phase: 'ga', required_scopes: ['https://www.googleapis.com/auth/calendar.freebusy']        },
  // ── connector.accounting — 会計ドメイン抽象層（KEY:CONNECTOR-DOMAIN-ABSTRACTION）──
  // Phase A: freee 実装。Phase B+: moneyforward / quickbooks 追加予定
  'connector.accounting.transaction_create': { label: '会計: 取引登録',       category: 'connector', execution: 'sync', risk: 'medium', tool_type: 'external', credits: 2, phase: 'ga'      },
  'connector.accounting.journal_create':     { label: '会計: 振替伝票登録',   category: 'connector', execution: 'sync', risk: 'medium', tool_type: 'external', credits: 2, phase: 'ga'      },
  'connector.accounting.accounts_list':      { label: '会計: 勘定科目一覧',   category: 'connector', execution: 'sync', risk: 'safe',   tool_type: 'external', credits: 1, phase: 'ga'      },
  'connector.accounting.partners_list':      { label: '会計: 取引先一覧',     category: 'connector', execution: 'sync', risk: 'safe',   tool_type: 'external', credits: 1, phase: 'ga'      },
  'connector.accounting.deals_list':         { label: '会計: 取引一覧',       category: 'connector', execution: 'sync', risk: 'safe',   tool_type: 'external', credits: 1, phase: 'ga'      },
  // ── connector.freee — brand name boundary ──────────────────────────────
  'connector.freee.api_call':                { label: 'freee: 汎用 API 呼び出し', category: 'connector', execution: 'sync', risk: 'medium', tool_type: 'external', credits: 1, phase: 'ga'      },

  // ── data (追加キー) ───────────────────────────────────────────────────────
  'data.vdb_semantic_search': { label: 'VDB Semantic Search（エイリアス）', category: 'data', execution: 'sync',  risk: 'safe', tool_type: 'vdb_read',  credits: 2, phase: 'ga'      },
  'data.schema_create':       { label: 'VDB Schema Create',               category: 'data', execution: 'sync',  risk: 'low',  tool_type: 'rpc',       credits: 3, phase: 'ga'      },

  // ── context (追加キー) ────────────────────────────────────────────────────
  'context.sense':     { label: '外部シグナル知覚',         category: 'context', execution: 'async', risk: 'safe', tool_type: 'agent', credits: 3, phase: 'planned' },
  'context.align':     { label: 'ゴール整合性チェック',     category: 'context', execution: 'sync',  risk: 'safe', tool_type: 'agent', credits: 2, phase: 'planned' },
  'context.aesthetic': { label: 'ブランドトーン定義',       category: 'context', execution: 'sync',  risk: 'safe', tool_type: 'rpc',   credits: 1, phase: 'planned' },

  // ── ai (追加キー) ─────────────────────────────────────────────────────────
  'ai.translate': { label: '翻訳（エイリアス）', category: 'ai', execution: 'sync', risk: 'safe', tool_type: 'ai', credits: 3, phase: 'ga' },

  // ── flow (追加キー) ───────────────────────────────────────────────────────
  'flow.schedule':      { label: 'Schedule Trigger', category: 'flow', execution: 'async', risk: 'safe', tool_type: 'flow', credits: 0, phase: 'ga'   },
  'flow.wait_approval': { label: 'Wait Approval',    category: 'flow', execution: 'async', risk: 'safe', tool_type: 'flow', credits: 0, phase: 'ga',   obp_prototype: 'flow.delegate' },
  'flow.compose':       { label: 'Compose',          category: 'flow', execution: 'sync',  risk: 'safe', tool_type: 'flow', credits: 0, phase: 'ga'   },

  // ── agent (追加キー) ──────────────────────────────────────────────────────
  'agent.invoke': { label: 'Agent Invoke', category: 'agent', execution: 'async', risk: 'low', tool_type: 'agent', credits: 5, phase: 'ga', obp_prototype: 'being.execute' },

  // ── media (追加キー) ──────────────────────────────────────────────────────
  'media.csv_parse':  { label: 'CSV Parse',    category: 'media', execution: 'sync', risk: 'safe', tool_type: 'rpc', credits: 1, phase: 'ga' },
  'media.csv_export': { label: 'CSV Export',   category: 'media', execution: 'sync', risk: 'safe', tool_type: 'rpc', credits: 1, phase: 'ga' },
  'media.docx_parse': { label: 'Word Parse',   category: 'media', execution: 'sync', risk: 'safe', tool_type: 'rpc', credits: 2, phase: 'ga' },

  // ── import (追加キー) ─────────────────────────────────────────────────────
  'import.auto_map': { label: 'Auto Map', category: 'import', execution: 'async', risk: 'safe', tool_type: 'ai', credits: 3, phase: 'ga' },

  // ── orchestrator (追加キー) ───────────────────────────────────────────────
  'orchestrator.spawn_team':  { label: 'Spawn Team',   category: 'orchestrator', execution: 'async', risk: 'medium', tool_type: 'agent', credits: 15, phase: 'beta', obp_prototype: 'being.coordinate' },
  'orchestrator.team_status': { label: 'Team Status',  category: 'orchestrator', execution: 'sync',  risk: 'safe',   tool_type: 'rpc',   credits: 0,  phase: 'beta'  },
}

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------

/** ツールキーに対応するメタデータを返す */
export function getToolMeta(key: OBPToolKey): OBPToolMeta {
  return OBP_TOOL_META[key]
}

/** カテゴリ内の全ツールキーを返す */
export function getToolKeysByCategory(category: OBPToolCategory): OBPToolKey[] {
  return Object.values(OBP_TOOL_KEYS[category]).flat(Infinity) as OBPToolKey[]
}

/** GA（一般公開）済みの全ツールキーを返す */
export function getGaToolKeys(): OBPToolKey[] {
  return (Object.keys(OBP_TOOL_META) as OBPToolKey[]).filter(
    (k) => OBP_TOOL_META[k].phase === 'ga',
  )
}

/** 有効なツールキーかどうかをランタイムで検証（EF / Deno 向け）*/
export function isValidToolKey(key: string): key is OBPToolKey {
  return key in OBP_TOOL_META
}
