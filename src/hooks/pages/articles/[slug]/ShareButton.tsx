import {
    FacebookShareButton, FacebookIcon,
    TwitterShareButton, TwitterIcon,
    LinkedinShareButton, LinkedinIcon,
    WhatsappShareButton, WhatsappIcon,
    TelegramShareButton, TelegramIcon,
    RedditShareButton, RedditIcon,
    EmailShareButton, EmailIcon,
    PinterestShareButton, PinterestIcon,
    LineShareButton, LineIcon,
} from 'next-share';

interface ShareButtonsProps {
    url: string;
    title: string;
    description?: string;
    media?: string;
}

export default function ShareButtons({ url, title, description = '', media = '' }: ShareButtonsProps) {
    return (
        <div className="flex flex-wrap gap-4">
            <FacebookShareButton url={url} quote={title} hashtag={'#nextshare'}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton url={url} title={title}>
                <TwitterIcon size={32} round />
            </TwitterShareButton>

            <LinkedinShareButton url={url} title={title}>
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            <WhatsappShareButton url={url} title={title} separator=":: ">
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>

            <TelegramShareButton url={url} title={title}>
                <TelegramIcon size={32} round />
            </TelegramShareButton>

            <RedditShareButton url={url} title={title}>
                <RedditIcon size={32} round />
            </RedditShareButton>

            <EmailShareButton url={url} subject={title} body={description}>
                <EmailIcon size={32} round />
            </EmailShareButton>

            <PinterestShareButton url={url} media={media} description={description}>
                <PinterestIcon size={32} round />
            </PinterestShareButton>

            <LineShareButton url={url} title={title}>
                <LineIcon size={32} round />
            </LineShareButton>
        </div>
    );
}