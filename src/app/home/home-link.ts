export class HomeLink {
  title: string;
  href: string;
  lead: string;
  ext: boolean;
  img: string;

  constructor(title: string, href: string, lead: string, ext: boolean, img: string) {
    this.title = title;
    this.href = href;
    this.lead = lead;
    this.ext = ext;
    this.img = img;
  }
}
