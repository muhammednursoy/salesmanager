package com.mnursoy.salesmanager.entity.model;

import static org.junit.Assert.assertEquals;

import java.math.BigDecimal;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.BlockJUnit4ClassRunner;

/**
 * @author Muhammed Nursoy
 *
 */
@RunWith(BlockJUnit4ClassRunner.class)
public class ProductPriceTest {

	@Test
	public void calculatesUnitPriceCorrectly() {
		ProductPrice productPrice = new ProductPrice();
		productPrice.setPrice(BigDecimal.valueOf(10));
		productPrice.setUnit(Unit.KG);
		productPrice.setBaseAmount(BigDecimal.valueOf(1));

		BigDecimal initialUnitPrice = productPrice.getUnitPrice();

		assertEquals(BigDecimal.valueOf(1000, 2), initialUnitPrice);
	}

	@Test
	public void calculatesUnitPriceCorrectlyWhenPriceIsChanged() {
		ProductPrice productPrice = new ProductPrice();
		productPrice.setPrice(BigDecimal.valueOf(8));
		productPrice.setUnit(Unit.GR);
		productPrice.setBaseAmount(BigDecimal.valueOf(100));
		assertEquals(BigDecimal.valueOf(8000, 2), productPrice.getUnitPrice());

		BigDecimal newPrice = productPrice.getPrice().add(BigDecimal.valueOf(4));
		productPrice.setPrice(newPrice);
		assertEquals(BigDecimal.valueOf(12000, 2), productPrice.getUnitPrice());
	}

	@Test
	public void calculatesUnitPriceCorrectlyWhenBaseAmountIsChanged() {
		ProductPrice productPrice = new ProductPrice();
		productPrice.setPrice(BigDecimal.valueOf(8));
		productPrice.setUnit(Unit.GR);
		productPrice.setBaseAmount(BigDecimal.valueOf(100));
		assertEquals(BigDecimal.valueOf(8000, 2), productPrice.getUnitPrice());

		productPrice.setBaseAmount(BigDecimal.valueOf(150));
		assertEquals(BigDecimal.valueOf(53.33), productPrice.getUnitPrice());
	}

	@Test
	public void calculatesUnitPriceCorrectlyWhenUnitIsByPiece() {
		ProductPrice productPrice = new ProductPrice();
		productPrice.setUnit(Unit.BY_PIECE);
		productPrice.setBaseAmount(BigDecimal.valueOf(10));
		productPrice.setPrice(BigDecimal.valueOf(13.5));

		assertEquals(BigDecimal.valueOf(135, 2), productPrice.getUnitPrice());
	}

	@Test
	public void calculatesUnitPriceCorrectlyWhenUnitILt() {
		ProductPrice productPrice = new ProductPrice();
		productPrice.setUnit(Unit.LT);
		productPrice.setBaseAmount(BigDecimal.valueOf(1.25));
		productPrice.setPrice(BigDecimal.valueOf(10));

		assertEquals(BigDecimal.valueOf(800, 2), productPrice.getUnitPrice());
	}

	@Test
	public void calculatesUnitPriceCorrectlyWhenUnitIsMl() {
		ProductPrice productPrice = new ProductPrice();
		productPrice.setUnit(Unit.ML);
		productPrice.setBaseAmount(BigDecimal.valueOf(250));
		productPrice.setPrice(BigDecimal.valueOf(13.5));

		assertEquals(BigDecimal.valueOf(5400, 2), productPrice.getUnitPrice());
	}
}