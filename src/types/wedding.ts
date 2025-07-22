import { UserImage } from "@/actions/UploadImages";

export interface getWeddingDataType {
    groom_name: string;
    groom_lastname: string;
    bride_name: string;
    bride_lastname: string;
    wedding_date: string;
    ceremony_time: string;
    ceremony_place: string;
    ceremony_city: string;
    ceremony_maps: string;
    party_time: string;
    party_place: string;
    party_city: string;
    party_maps: string;
    gift_type: string;
    gift_details: string;
}

export interface WeddingType {
    groom_name: string;
    bride_name: string;
}

export interface WeddingDetailsType {
    wedding_date: string;
    ceremony_time: string;
    ceremony_place: string;
    ceremony_city: string;
    ceremony_maps: string;
    party_time: string;
    party_place: string;
    party_city: string;
    party_maps: string;
    gift_type: string;
    gift_details: string;
}

export interface GuestType {
    name: string;
    number_of_people: number;
    number_of_kids: number;
}

export interface WeddingDetailsPropsType {
    weddingDetails: {
        wedding_date: string;
        ceremony_time: string;
        ceremony_place: string;
        ceremony_city: string;
        ceremony_maps: string;
        party_time: string;
        party_place: string;
        party_city: string;
        party_maps: string;
        gift_type: string;
        gift_details: string;
    };
    guest: {
        name: string;
        number_of_people: number;
        number_of_kids: number;
    };
    images: UserImage[];
}
