-- CreateTable
CREATE TABLE "public"."account" (
    "idx" SERIAL NOT NULL,
    "sdvx_id" VARCHAR(255),
    "pw" VARCHAR(255) NOT NULL,
    "vf" INTEGER,
    "play_count" INTEGER,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" VARCHAR(255) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "update_at" TIMESTAMPTZ(6),
    "player_name" VARCHAR(255),
    "skill_level" VARCHAR(255),
    "rankidx" INTEGER DEFAULT 1,
    "is_hidden" INTEGER DEFAULT 0,

    CONSTRAINT "account_pkey" PRIMARY KEY ("idx")
);

-- CreateTable
CREATE TABLE "public"."chart" (
    "idx" SERIAL NOT NULL,
    "song_idx" SERIAL NOT NULL,
    "level" INTEGER NOT NULL,
    "type" VARCHAR(255),
    "jacket" VARCHAR(255),
    "chart_img" VARCHAR(255),
    "effector" VARCHAR(255),
    "illustrator" VARCHAR(255) NOT NULL,
    "max_exscore" INTEGER,
    "max_chain" INTEGER,
    "chip_count" INTEGER,
    "hold_count" INTEGER,
    "tsumami_count" INTEGER,
    "deleted_at" TIMESTAMPTZ(6),
    "type_idx" INTEGER DEFAULT 0,

    CONSTRAINT "chart_pkey" PRIMARY KEY ("idx")
);

-- CreateTable
CREATE TABLE "public"."playdata" (
    "idx" SERIAL NOT NULL,
    "account_idx" SERIAL NOT NULL,
    "chart_idx" SERIAL NOT NULL,
    "chart_vf" INTEGER NOT NULL,
    "rank" INTEGER,
    "play_count" INTEGER,
    "clear_count" INTEGER,
    "uc_count" INTEGER,
    "puc_count" INTEGER,
    "score" INTEGER NOT NULL,
    "ex_score" INTEGER,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score_idx" INTEGER,

    CONSTRAINT "playdata_pkey" PRIMARY KEY ("idx")
);

-- CreateTable
CREATE TABLE "public"."radar" (
    "idx" SERIAL NOT NULL,
    "chart_idx" SERIAL NOT NULL,
    "notes" INTEGER NOT NULL,
    "peak" INTEGER NOT NULL,
    "tsumami" INTEGER NOT NULL,
    "tricky" INTEGER NOT NULL,
    "handtrip" INTEGER NOT NULL,
    "onehand" INTEGER NOT NULL,

    CONSTRAINT "radar_pkey" PRIMARY KEY ("idx")
);

-- CreateTable
CREATE TABLE "public"."song" (
    "idx" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "artist" VARCHAR(255) NOT NULL,
    "ascii" VARCHAR(255) NOT NULL,
    "ascii_title" VARCHAR NOT NULL,
    "ascii_artist" VARCHAR NOT NULL,
    "title_yomigana" VARCHAR NOT NULL,
    "artist_yomigana" VARCHAR NOT NULL,
    "version" INTEGER NOT NULL,
    "main_bpm" INTEGER,
    "bpm" VARCHAR(255) NOT NULL,
    "genre_txt" VARCHAR(255) NOT NULL,
    "date" TIMESTAMP(6) NOT NULL,
    "konaste" BOOLEAN NOT NULL,

    CONSTRAINT "song_pkey" PRIMARY KEY ("idx")
);

-- CreateTable
CREATE TABLE "public"."tag" (
    "idx" SERIAL NOT NULL,
    "account_idx" SERIAL NOT NULL,
    "song_idx" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("idx")
);

-- CreateTable
CREATE TABLE "public"."genre" (
    "idx" SERIAL NOT NULL,
    "song_idx" SERIAL NOT NULL,
    "genre_idx" INTEGER NOT NULL,

    CONSTRAINT "genre_pkey" PRIMARY KEY ("idx")
);

-- AddForeignKey
ALTER TABLE "public"."chart" ADD CONSTRAINT "fk_song_to_chart" FOREIGN KEY ("song_idx") REFERENCES "public"."song"("idx") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."playdata" ADD CONSTRAINT "fk_account_to_playdata" FOREIGN KEY ("account_idx") REFERENCES "public"."account"("idx") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."playdata" ADD CONSTRAINT "fk_chart_to_playdata" FOREIGN KEY ("chart_idx") REFERENCES "public"."chart"("idx") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."radar" ADD CONSTRAINT "fk_chart_to_radar" FOREIGN KEY ("chart_idx") REFERENCES "public"."chart"("idx") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."tag" ADD CONSTRAINT "fk_account_to_tag" FOREIGN KEY ("account_idx") REFERENCES "public"."account"("idx") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."tag" ADD CONSTRAINT "fk_song_to_tag" FOREIGN KEY ("song_idx") REFERENCES "public"."song"("idx") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."genre" ADD CONSTRAINT "fk_song_to_genre" FOREIGN KEY ("song_idx") REFERENCES "public"."song"("idx") ON DELETE NO ACTION ON UPDATE NO ACTION;
