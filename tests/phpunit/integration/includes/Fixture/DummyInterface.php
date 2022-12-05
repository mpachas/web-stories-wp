<?php

declare(strict_types = 1);

namespace Google\Web_Stories\Tests\Integration\Fixture;

interface DummyInterface {
	/**
	 * @return mixed
	 */
	public function get_dummy(); // phpcs:ignore SlevomatCodingStandard.TypeHints.ReturnTypeHint.MissingNativeTypeHint
}
