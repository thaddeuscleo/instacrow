interface User {
    pk: string;
    pk_id: string;
    full_name: string;
    is_private: boolean;
    strong_id__: string;
    username: string;
    is_verified: boolean;
    profile_pic_id: string;
    profile_pic_url: string;
}

interface Usertag {
    user: User;
    position: [number, number];
    start_time_in_video_in_sec: null | number;
    duration_in_video_in_sec: null | number;
}

interface Caption {
    pk: string;
    user_id: string;
    user: User;
    type: number;
    text: string;
    did_report_as_spam: boolean;
    created_at: number;
    created_at_utc: number;
    content_type: string;
    status: string;
    bit_flags: number;
    share_enabled: boolean;
    is_ranked_comment: boolean;
    is_covered: boolean;
    private_reply_status: number;
    media_id: string;
}

interface Location {
    pk: string;
    short_name: string;
    facebook_places_id: string;
    external_source: string;
    name: string;
    address: string;
    city: string;
    has_viewer_saved: boolean;
    lng: number;
    lat: number;
    is_eligible_for_guides: boolean;
}

interface MusicMetadata {
    music_canonical_id: string;
    audio_type: null;
    music_info: null;
    original_sound_info: null;
    pinned_media_ids: null;
}

interface CarouselMedia {
    id: string;
    explore_pivot_grid: boolean;
    product_type: string;
    media_type: number;
    accessibility_caption: string;
    image_versions2: {
        candidates: {
            width: number;
            height: number;
            url: string;
        }[];
    };
    original_width: number;
    original_height: number;
    carousel_parent_id: string;
    pk: string;
    commerciality_status: string;
    taken_at: number;
    preview: string;
    usertags: {
        in: Usertag[];
    };
    featured_products: any[];
    shop_routing_user_id: null;
    sharing_friction_info: {
        should_have_sharing_friction: boolean;
        bloks_app_url: null;
        sharing_friction_payload: null;
    };
    product_suggestions: any[];
}

interface PostInfoResponse {
    items: {
        taken_at: number;
        pk: string;
        id: string;
        device_timestamp: number;
        client_cache_key: string;
        filter_type: number;
        caption_is_edited: boolean;
        like_and_view_counts_disabled: boolean;
        strong_id__: string;
        is_reshare_of_text_post_app_media_in_ig: boolean;
        is_post_live_clips_media: boolean;
        deleted_reason: number;
        integrity_review_decision: string;
        has_shared_to_fb: number;
        is_unified_video: boolean;
        should_request_ads: boolean;
        is_visual_reply_commenter_notice_enabled: boolean;
        commerciality_status: string;
        explore_hide_comments: boolean;
        usertags: {
            in: Usertag[];
        };
    }[];
    photo_of_you: boolean;
    shop_routing_user_id: null;
    can_see_insights_as_brand: boolean;
    is_organic_product_tagging_eligible: boolean;
    has_liked: boolean;
    like_count: number;
    facepile_top_likers: any[];
    top_likers: any[];
    media_type: number;
    code: string;
    can_viewer_reshare: boolean;
    caption: Caption;
    clips_tab_pinned_user_ids: any[];
    comment_inform_treatment: {
        should_have_inform_treatment: boolean;
        text: string;
        url: null;
        action_type: null;
    };
    sharing_friction_info: {
        should_have_sharing_friction: boolean;
        bloks_app_url: null;
        sharing_friction_payload: null;
    };
    original_media_has_visual_reply_media: boolean;
    can_viewer_save: boolean;
    is_in_profile_grid: boolean;
    profile_grid_control_enabled: boolean;
    featured_products: any[];
    is_comments_gif_composer_enabled: boolean;
    product_suggestions: any[];
    user: User;
    image_versions2: {
        candidates: {
            width: number;
            height: number;
            url: string;
        }[];
    };
    original_width: number;
    original_height: number;
    product_type: string;
    is_paid_partnership: boolean;
    location: Location;
    music_metadata: MusicMetadata;
    organic_tracking_token: string;
    ig_media_sharing_disabled: boolean;
    lng: number;
    lat: number;
    is_open_to_public_submission: boolean;
    carousel_media_count: number;
    carousel_media: CarouselMedia[];
}
