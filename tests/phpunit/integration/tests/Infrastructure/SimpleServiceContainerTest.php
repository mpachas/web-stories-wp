<?php

declare(strict_types = 1);

namespace Google\Web_Stories\Tests\Integration\Infrastructure;

use Google\Web_Stories\Exception\InvalidService;
use Google\Web_Stories\Infrastructure\Service;
use Google\Web_Stories\Infrastructure\ServiceContainer\SimpleServiceContainer;
use Google\Web_Stories\Tests\Integration\TestCase;

final class SimpleServiceContainerTest extends TestCase {
	public function test_it_can_check_for_service_existence(): void {
		$service   = $this->createMock( Service::class );
		$container = new SimpleServiceContainer( [ 'known_service' => $service ] );

		$this->assertTrue( $container->has( 'known_service' ) );
		$this->assertFalse( $container->has( 'unknown_service' ) );
	}

	public function test_it_can_return_services(): void {
		$service   = $this->createMock( Service::class );
		$container = new SimpleServiceContainer( [ 'some_service' => $service ] );

		$this->assertSame( $service, $container->get( 'some_service' ) );
	}

	public function test_it_can_accept_new_services(): void {
		$service   = $this->createMock( Service::class );
		$container = new SimpleServiceContainer( [ 'service_a' => $service ] );

		$container->put( 'service_b', $service );

		$this->assertTrue( $container->has( 'service_a' ) );
		$this->assertSame( $service, $container->get( 'service_a' ) );
		$this->assertTrue( $container->has( 'service_b' ) );
		$this->assertSame( $service, $container->get( 'service_b' ) );
	}

	public function test_it_throws_when_retrieving_an_unknown_service(): void {
		$container = new SimpleServiceContainer();

		$this->expectException( InvalidService::class );
		$this->expectExceptionMessage( 'The service ID "unknown_service" is not recognized and cannot be retrieved.' );
		$container->get( 'unknown_service' );
	}
}
