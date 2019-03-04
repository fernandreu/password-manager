import {FaIconComponent} from '@fortawesome/angular-fontawesome';

/**
 * Class which holds all properties related to an individual field inside a card
 */
export class PassField {
  public key = '';
  public value = '';

  /**
   * Whether the value of the field should be hidden unless being edited
   */
  public hidden = false;

  public constructor(init?: Partial<PassField>) {
    Object.assign(this, init);
  }

  public isEqual(other: PassField) {
    return this.key === other.key && this.value === other.value && this.hidden === other.hidden;
  }
}

/**
 * Class which holds all properties related to an individual card
 */
export class PassCard {
  public title = '';
  public color = '';
  public icon = '';
  public fields = new Array<PassField>();
  public notes = '';

  public constructor(init?: Partial<PassCard>) {
    Object.assign(this, init);

    // Ensure fields are of the right type too
    for (let i = 0; i < this.fields.length; ++i) {
      if (!(this.fields[i] instanceof PassField)) {
        this.fields[i] = new PassField(this.fields[i]);
      }
    }
  }

  public faIcon(): string[] {
    if (this.icon === undefined || this.icon === '') {
      return null;
    }

    const parts = this.icon.split(' ');

    // Second part might start with 'fa-', so let's remove it
    if (parts.length === 2 && parts[1].startsWith('fa-')) {
      parts[1] = parts[1].substring(3);
    } else {
      return null;
    }

    return parts;
  }

  public isEqual(other: PassCard) {
    if (this.title !== other.title || this.color !== other.color || this.icon !== other.icon || this.notes !== other.notes) {
      return false;
    }

    if (this.fields.length !== other.fields.length) {
      return false;
    }

    for (let i = 0; i < this.fields.length; ++i) {
      if (!this.fields[i].isEqual(other.fields[i])) {
        return false;
      }
    }

    return true;
  }
}

/**
 * Class which holds all data stored in the cloud or in the web browser session
 */
export class PassSession {

  /**
   * An integer reflecting the current version of this class. This should be incremented each
   * time changes are made, and the migrate() method updated accordingly
   */
  private static readonly LatestVersion = 1;

  public version = PassSession.LatestVersion;

  /**
   * The date when the session was last saved in the cloud
   */
  public savedDate: Date = null;

  public cards = new Array<PassCard>();

  public constructor(init?: Partial<PassSession>) {
    if (init !== undefined && init.version !== undefined && init.version < PassSession.LatestVersion) {
      init = PassSession.migrate(init);
    }
    Object.assign(this, init);

    // Ensure cards are of the right type too
    for (let i = 0; i < this.cards.length; ++i) {
      if (!(this.cards[i] instanceof PassCard)) {
        this.cards[i] = new PassCard(this.cards[i]);
      }
    }
  }

  private static migrate(data: Partial<PassSession>): Partial<PassSession> {
    // Migration changes go in here
    return data;
  }
}
