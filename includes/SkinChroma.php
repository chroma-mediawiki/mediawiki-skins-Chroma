<?php
/**
 * Chroma skin.
 *
 * @license GPL-3.0-or-later
 */

namespace MediaWiki\Skins\Chroma;

/**
 * Mustache-based skin for Chroma.
 */
class SkinChroma extends \SkinMustache {

	/**
	 * @inheritDoc
	 */
	public function getTemplateData() {
		$data = parent::getTemplateData();
		$data['sitename'] = $this->getConfig()->get( 'Sitename' );
		$data['link-search'] = \SpecialPage::getTitleFor( 'Search' )->getLocalURL();
		$title = $this->getTitle();
		$data['is-editable'] = (bool)$title && $title->exists() && !$title->isSpecialPage()
			&& $this->getAuthority()->isAllowed( 'edit' );
		$data['link-edit'] = $title ? $title->getLocalURL( [ 'action' => 'edit' ] ) : '';
		return $data;
	}
}
