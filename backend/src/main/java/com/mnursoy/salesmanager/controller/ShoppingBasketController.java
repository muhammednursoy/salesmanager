package com.mnursoy.salesmanager.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mnursoy.salesmanager.entity.ShoppingBasket;
import com.mnursoy.salesmanager.exception.ResourceNotFoundException;
import com.mnursoy.salesmanager.repository.ProductRepository;
import com.mnursoy.salesmanager.repository.SaleRecordRepository;
import com.mnursoy.salesmanager.repository.ShoppingBasketRepository;

/**
 * @author Muhammed Nursoy
 *
 */
@RestController
@RequestMapping("api/baskets")
public class ShoppingBasketController {
	private static final Logger LOG = LoggerFactory.getLogger(ShoppingBasketController.class);

	private final ShoppingBasketRepository repository;
	private final ProductRepository productRepository;
	private final SaleRecordRepository saleRecordRepository;

	@Autowired
	public ShoppingBasketController(ShoppingBasketRepository repository, ProductRepository productRepository,
		SaleRecordRepository saleRecordRepository) {
		this.repository = repository;
		this.productRepository = productRepository;
		this.saleRecordRepository = saleRecordRepository;
	}

	@GetMapping("{id}")
	public ShoppingBasket getShoppingBasket(@PathVariable("id") Long id) {
		LOG.info("getShoppingBasket::id={}",id);
		return repository.findById(id).orElseThrow(ResourceNotFoundException::new);
	}

	@GetMapping("history")
	public Page<ShoppingBasket> getShoppingHistory(Pageable pageable) {
		LOG.info("getShoppingHistory::pageable={}",pageable);
		return repository.findAll(pageable);
	}

	@PostMapping("create")
	public long createShoppingBasket(@RequestBody ShoppingBasket basket) {
		LOG.info("createShoppingBasket::basket={}",basket);
		basket.getSaleRecords().forEach(record -> {
			record.setSoldProduct(productRepository.findById(record.getSoldProduct().getId()).orElseThrow(ResourceNotFoundException::new));
			basket.setTotalPrice(basket.getTotalPrice().add(record.getCollectedCash()));
		});
		basket.setDisabled(Boolean.FALSE);
		return repository.save(basket).getId();
	}

	@PostMapping("disable")
	public void disableShoppingBasket(Long id) {
		LOG.info("disableShoppingBasket::id={}",id);
		ShoppingBasket basketToDisable = repository.findById(id).orElseThrow(ResourceNotFoundException::new);
		basketToDisable.disable();
		repository.save(basketToDisable);
	}

	@PostMapping("enable")
	public void enableShoppingBasket(Long id) {
		LOG.info("enableShoppingBasket::id={}",id);
		ShoppingBasket basketToEnable = repository.findById(id).orElseThrow(ResourceNotFoundException::new);
		basketToEnable.enable();
		repository.save(basketToEnable);
	}

}
