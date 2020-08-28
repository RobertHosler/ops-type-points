export class HomeLink {
  title: string;
  href: string;
  lead: string;
  ext: boolean;

  constructor(title: string, href: string, lead: string, ext: boolean) {
    this.title = title;
    this.href = href;
    this.lead = lead;
    this.ext = ext;
  }
}
